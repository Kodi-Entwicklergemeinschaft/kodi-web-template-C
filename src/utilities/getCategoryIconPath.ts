const categoryIconMap: Record<number | string , string> = {
    1: "news_events_category_icon",
    3: "news_events_category_icon",
    13: "gastro_category_icon",
    41: "highlight_category_icon",
    17: "tourism_category_icon",
    "favorites": "favourites_category_icon",
  };
  
  export function getCategoryIconPath(categoryId: number | string ): string {
    return categoryIconMap[categoryId] ;
  }
  