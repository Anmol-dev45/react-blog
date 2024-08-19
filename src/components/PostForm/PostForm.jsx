import { useCallback, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, RTE, Select } from "../index";
import service from "../../appwrite/config";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const onSubmit = async (data) => {
    setLoading(true);
    if (post) {
      const image = data.image[0];
      const file = image ? await service.uploadFile(image) : null;

      if (file) {
        await service.deleteFile(post.featuredImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate("/post/" + dbPost.$id);
      }
    } else {
      const image = data.image[0];
      const file = image ? await service.uploadFile(image) : null;
      const dbPost = await service.createPost({
        ...data,
        featuredImage: file ? file.$id : undefined,
        userId: userData.$id,
      });

      if (dbPost) {
        navigate("/post/" + dbPost.$id);
      }
    }

    setLoading(false);
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  useEffect(() => {
    if (post) {
      setValue("title", post.title || "");
      setValue("slug", post.$id || "");
      setValue("content", post.content || "");
      setValue("status", post.status || "active");
    }
  }, [post, setValue]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {loading ? "Loading..." : post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
