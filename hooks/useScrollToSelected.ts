import { useEffect, useRef, RefObject } from "react";
import { ScrollView } from "react-native";

/**
 * Hook to scroll to a selected item in a ScrollView on initial load
 * @param items - Array of items to search through
 * @param selectedItem - The currently selected item to scroll to
 * @param itemHeight - Height of each item in pixels
 * @param compareFn - Optional comparison function. If not provided, uses === for comparison
 * @returns Ref to attach to the ScrollView component
 */
export function useScrollToSelected<T>(props: {
  items: T[];
  selectedItem: T;
  compareFn?: (item: T, selected: T) => boolean;
  itemHeight?: number;
  offset?: number;
}): RefObject<ScrollView | null> {
  const {
    items,
    selectedItem,
    itemHeight = 40,
    compareFn,
    offset = 20,
  } = props;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const findIndex = compareFn
      ? items.findIndex((item) => compareFn(item, selectedItem))
      : items.findIndex((item) => item === selectedItem);

    if (findIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: findIndex * itemHeight - offset,
        animated: false,
      });
    }
  }, []); // Empty dependency array means this runs once on mount

  return scrollViewRef;
}
