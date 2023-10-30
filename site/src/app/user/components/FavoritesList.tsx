"use client";

import tw from "twin.macro";

import FavoritesItem from "./FavoritesItem";

const Container = tw.div`
  grid grid-flow-row grid-cols-5 gap-4 py-4
  max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2
  max-md:grid-cols-1
`;

export default function FavoritesList() {
  return (
    <Container>
      {Array.from({ length: 10 }).map((_, index) => (
        <FavoritesItem key={index} />
      ))}
    </Container>
  );
}
