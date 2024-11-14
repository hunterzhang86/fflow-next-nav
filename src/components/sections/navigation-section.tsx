"use client";

import { useState } from "react";
import NavigationLayout from "../navigation/navigation-layout";
import Menu from "../navigation/menu";
import Cards from "../navigation/cards";
import MaxWidthWrapper from "../shared/max-width-wrapper";

export default function NavigationSection() {
  const [selectedCategory, setSelectedCategory] = useState<{
    categoryId: string;
    subCategoryId: string;
  } | null>(null);

  const handleSubCategorySelect = (categoryId: string, subCategoryId: string) => {
    console.log('Selected category:', categoryId, subCategoryId);
    setSelectedCategory({ categoryId, subCategoryId });
  };

  return (    
    <section className="py-4">
      <MaxWidthWrapper>
        <div className="mt-0">
          <NavigationLayout>
      <Menu 
        className="w-full md:w-64 shrink-0" 
        onSubCategorySelect={handleSubCategorySelect}
      />
      <Cards 
        className="flex-1" 
        categoryId={selectedCategory?.categoryId}
        subCategoryId={selectedCategory?.subCategoryId}
      />
          </NavigationLayout>
        </div>
      </MaxWidthWrapper>
    </section>
  );
} 