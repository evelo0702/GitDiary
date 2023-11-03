import { useParams } from "react-router-dom";
const DetailPage = () => {
  const { id } = useParams();
  return <div>DetailPage{id}</div>;
};

export default DetailPage;
