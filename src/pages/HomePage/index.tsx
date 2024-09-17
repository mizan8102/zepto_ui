import FontTable from "../../components/FontTable";
import FileUpload from "../../components/TtfUploader";

export default function index() {
  return (
    <div className="w-full m-8 ">
      <FileUpload />
      <h1 className="mt-8 text-3xl font-bold underline">Font Lists </h1>
      <FontTable />
    </div>
  );
}
