import FileUpload from "../../components/TtfUploader";

export default function index() {
  return (
    <div className="w-full m-8 ">
      <FileUpload />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
