import React from 'react';
import { SyncLoader, ClipLoader } from "react-spinners";

function Spinner( {loading} ) {

  const override  = {
    display: "block",
    margin: "0 auto",
    borderColor: "green",
  };

  return (
    <div className="flex items-center justify-center">
        <SyncLoader
          color='green'
          loading={loading}
          cssOverride={override}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>
  );
};

export default Spinner;