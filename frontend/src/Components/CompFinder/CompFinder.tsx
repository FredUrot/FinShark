import React, { useEffect, useState } from "react";
import CompFinderItem from "./CompFinderItem/CompFinderItem";
import { CompanyCompData } from "../../company";
import { getCompData } from "../../api";
import Spinner from "../Spinners/Spinner";
import { handleError } from "../../Helpers/ErrorHandler";
type Props = {
  ticker: string;
};

const CompFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyCompData>();
  const [showSpinner, setShowSpinner] = useState(true);
  let spinner = <Spinner/>;
  useEffect(() => {
  const getComps = async () => {
    try {
      const value = await getCompData(ticker);
      setCompanyData(value?.data[0]);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setShowSpinner(false);
    }
  };
  getComps();
}, [ticker]);
  return (
  <div className="inline-flex rounded-md shadow-sm m-4" role="group">
    {companyData ? (
      companyData.peersList.map((ticker) => (
        <CompFinderItem key={ticker} ticker={ticker} />
      ))
    ) : showSpinner ? (
      <Spinner />
    ) : (
      <></>
    )}
  </div>
);
};

export default CompFinder;
