import { useCurrentGridPreset } from "../../../../../hooks/useCurrentGridPreset";

export const useCheckCcIndexUniqueness = () => {
  const currentGridPreset = useCurrentGridPreset();
  const numberOfVisibleElements =
    currentGridPreset.columnCount * currentGridPreset.rowCount;

  const getOtherElementIndexesWithMatchingCcIndex = (
    currentElementIndex: number,
    ccIndex: number
  ) => {
    if (ccIndex < 0 || ccIndex > 127) {
      return [];
    }

    const indexes: number[] = [];

    // Checking the element that we're currently on. Only error if the CC index is the same for both
    const {
      xAxisControlIndex: currentXIndex,
      yAxisControlIndex: currentYIndex,
    } = currentGridPreset.gridElements[currentElementIndex].controlChangeState;
    if (currentYIndex === ccIndex && currentXIndex === ccIndex) {
      indexes.push(currentElementIndex);
    }

    for (let i = 0; i < numberOfVisibleElements; i++) {
      if (currentElementIndex === i) {
        continue;
      }

      const { isMidiNote, controlChangeState } =
        currentGridPreset.gridElements[i];
      if (isMidiNote) {
        continue;
      }

      const {
        xAxisControlIndex: currentXIndex,
        yAxisControlIndex: currentYIndex,
      } = controlChangeState;
      if (currentXIndex === ccIndex || currentYIndex === ccIndex) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  return { getOtherElementIndexesWithMatchingCcIndex };
};
