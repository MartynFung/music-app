"use client"
import * as React from "react";

export interface ScrollItem<T> {
    index: number,
    id: string;
    data: T;
}

interface Props<T> {
    children?: React.ReactNode;
    items: ScrollItem<T>[];
    renderItem: (item: ScrollItem<T>) => React.ReactNode;
    itemsPerPage: number;
}

export function InfiniteScroll<T>({ items, renderItem, itemsPerPage = 10 }: Props<T>): React.JSX.Element {
    const [visibleItems, setVisibleItems] = React.useState(itemsPerPage);

    React.useEffect(() => {
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
                <React.Fragment key={item.id}>
                    {renderItem(item)}
                </React.Fragment>
            ))}
        </>
    );
}
