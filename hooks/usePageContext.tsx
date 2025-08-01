import React, { createContext, ReactNode, useContext, useState } from "react";

export enum Page {
  Play = "Play",
  EditGrid = "EditGrid",
  ScaleSettings = "ScaleSettings",
  ColorSettings = "ColorSettings",
  NetworkSettings = "NetworkSettings",
}

const settingsPages = [
  Page.ScaleSettings,
  Page.ColorSettings,
  Page.NetworkSettings,
];

type PageContextType = {
  page: Page;
  isInSettings: boolean;
  navigateTo: (page: Page) => void;
  togglePlayMode: () => void;
  toggleSettings: () => void;
  goToSettings: (page: Page) => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(Page.Play);
  const [settingsPage, setSettingsPage] = useState(Page.ScaleSettings);

  const togglePlayMode = () => {
    setPage(page === Page.Play ? Page.EditGrid : Page.Play);
  };

  const toggleSettings = () => {
    setPage(settingsPages.includes(page) ? Page.EditGrid : settingsPage);
  };

  const goToSettings = (page: Page) => {
    setPage(page);
    setSettingsPage(page);
  };

  const isInSettings = settingsPages.includes(page);

  return (
    <PageContext.Provider
      value={{
        page,
        isInSettings,
        navigateTo: setPage,
        togglePlayMode,
        toggleSettings,
        goToSettings,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
}
