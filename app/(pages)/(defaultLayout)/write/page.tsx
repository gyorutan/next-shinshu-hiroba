import CreatePostForm from "@/components/post/CreatePostForm";

const WritePage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-800">
      <div className="w-full h-full">
        <CreatePostForm />
      </div>
    </div>
  );
};

export default WritePage;
