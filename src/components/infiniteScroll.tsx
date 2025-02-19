"use client";
import * as React from "react";
import { JSX, useEffect, useState } from "react";

export interface ScrollItem<T> {
  index: number;
  id: string;
  data: T;
}

interface Props<T> {
  children?: React.ReactNode;
  items: ScrollItem<T>[];
  renderItem: (item: ScrollItem<T>) => React.ReactNode;
  itemsPerPage: number;
}

export function InfiniteScroll<T>({
  items,
  renderItem,
  itemsPerPage = 10,
}: Props<T>): JSX.Element {
  const [visibleItems, setVisibleItems] = useState<number>(itemsPerPage);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (scrolledToBottom) {
        setVisibleItems((prevVisibleItems) =>
          Math.min(prevVisibleItems + itemsPerPage, items.length)
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items, itemsPerPage]);

  return (
    <>
      {items.slice(0, visibleItems).map((item) => (
        <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
      ))}
    </>
  );
}
