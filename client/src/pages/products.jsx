import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { ProductTile, Header, Button, Loading } from "../components";

const GET_PRODUCTS = gql`
  query productList {
    products {
      id
      name
      price
      thisWeek
    }
  }
`;

const Products = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header />
      {data.products && data.products.map(product => (
          <ProductTile key={product.id} product={product} />
        ))}
    </Fragment>
  );
};

export default Products;