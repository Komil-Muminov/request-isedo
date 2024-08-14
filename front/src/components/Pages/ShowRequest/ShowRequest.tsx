import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRqsts, GetRqstsType } from "../../API/GetRqsts";
import { getRqstsById, GetRqstsByIdType } from "../../API/GetRqstsById";
import { queryClient } from "../../../queryClient";

const ShowRequest = () => {
  const { id } = useParams();
  const numericId = parseInt(id || "", 10);

  const getRqstsByIdQuery = useQuery(
    {
      queryFn: () => getRqstsById(numericId),
      queryKey: [`request-${numericId}`],
    },
    queryClient
  );

  const [rqstsData, setRqstsData] = useState<GetRqstsByIdType | null>(null);

  useEffect(() => {
    if (getRqstsByIdQuery.status === "success") {
      setRqstsData(getRqstsByIdQuery.data);
    } else if (getRqstsByIdQuery.status === "error") {
      console.error(getRqstsByIdQuery.error);
    }
  }, [getRqstsByIdQuery]);

  return (
    <div>
      {rqstsData ? (
        <div>
          <h1>Request Details</h1>
          <p>ID: {rqstsData.id}</p>
          <p>Org Name: {rqstsData.orgname}</p>
          <p>Accountant: {rqstsData.accountant}</p>
          <p>Description: {rqstsData.desc}</p>
          <p>Request Type: {rqstsData.reqType}</p>
          <p>Request Status: {rqstsData.reqStatus}</p>
          <p>Date and Time: {rqstsData.dateTime}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowRequest;
