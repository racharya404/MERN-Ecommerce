import React from 'react';
import styles from "../../styles/styles";
import { Link } from 'react-router-dom';

const ShopMore = () => {
    return (
        <div>
            <div className={`${styles.heading}`}>
                <h1>Best Selling</h1>
            </div>
            <button className={`${styles.shopMore}`}>
                <Link to={`/best-selling`}>Shop More
                </Link>
            </button>
        </div>
    )
}

export default ShopMore;