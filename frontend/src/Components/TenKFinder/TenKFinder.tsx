import React, { useEffect, useState } from "react";
import { CompanyTenK } from "../../company";
import { getTenK } from "../../api";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem";
import Spinner from "../Spinners/Spinner";
import { handleError } from "../../Helpers/ErrorHandler";

type Props = {
  ticker: string;
};

const TenKFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyTenK[]>();
  let spinner = <Spinner/>;
  useEffect(() => {
    const getTenKData = async () => {
      try {
      const value = await getTenK(ticker);
      console.log("from getTenK",value);
      setCompanyData(value?.data);
      } catch (error: any) {
        console.log("TenKFinder error called");
        handleError(error.message)
        spinner = <></>;
      }
    };
    getTenKData();
  }, [ticker]);
  return (
    <div className="inline-flex rounded-md shadow-sm m-4" role="group">
      {companyData ? (
        companyData?.slice(0, 5).map((tenK) => {
          return <TenKFinderItem tenK={tenK} key={tenK.finalLink}/>;
        })
      ) : (
        spinner
      )}
    </div>
  );
};

export default TenKFinder;
