import { useContext } from "react";
import { useParams } from "react-router-dom";
import { StateContext } from "../App";
import MarkdownRender from "../components/RenderCard";
const DetailPage = () => {
  const { diaryData } = useContext(StateContext);
  const { id } = useParams();
  const detailData = diaryData.filter((it) => it._id === id);
  return <div>{detailData && <MarkdownRender newData={detailData[0]} />}</div>;
};

export default DetailPage;
