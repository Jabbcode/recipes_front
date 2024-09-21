import { IngredientTabs } from "./components";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UnitTabs } from "./components/UnitTabs";

const MyStorePage = () => {
  return (
    <Tabs defaultValue="ingredients">
      <TabsList className="grid grid-cols-2 w-[400px]">
        <TabsTrigger value="ingredients">Ingredientes</TabsTrigger>
        <TabsTrigger value="units">Unidades</TabsTrigger>
      </TabsList>
      <TabsContent value="ingredients">
        <IngredientTabs />
      </TabsContent>
      <TabsContent value="units">
        <UnitTabs />
      </TabsContent>
    </Tabs>
  );
};
export default MyStorePage;
