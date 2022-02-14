import React, { useState } from "react";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";

const Loader = () => {
    let [loading] = useState(true);

    const override = css`
        display: block;
        margin: 0 auto;
        margin-top: 150px;
    `;

    return (
        <div className='sweet-loading'>
            <RingLoader
                color='#003580'
                css={override}
                loading={loading}
                size={100}
            />
        </div>
    );
};
export default Loader;
