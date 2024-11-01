import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StateContext } from "../App";
import MarkdownRender from "../components/RenderCard";
const DetailPage = () => {
  const { diaryData } = useContext(StateContext);
  const { id } = useParams();
  const [detailData, setDetail] = useState();

  useEffect(() => {
    if (diaryData.length > 0) {
      setDetail(diaryData.filter((it) => it._id === id));
    }
  }, []);

  return (
    <div className="pb-10">
      {detailData ? (
        <MarkdownRender detailData={detailData[0]} />
      ) : (
        <div className="text-center">
          해당 일기에 접근권한이 없습니다. 로그인을 해주세요
        </div>
      )}
    </div>
  );
};

export default DetailPage;
