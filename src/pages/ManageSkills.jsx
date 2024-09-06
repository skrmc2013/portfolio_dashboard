import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import {
  clearAllSkillsErrors,
  deleteSkill,
  getAllSkills,
  resetSkillSlice,
} from "@/store/slices/skillSlice";
import { updateSkill } from "@/store/slices/iconsSlice";
import SpeacialDeleteButton from "./sub-components/SpeacialDeleteButton";
import { Progress } from "@/components/ui/progress";

const ManageSkills = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/dashboard");
  };
  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  );
  const dispatch = useDispatch();

  const [newProficiency, setNewProficiency] = useState(1);
  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };

  const [skillId, setSkillId] = useState("");

  const handleDeleteSkill = (id) => {
    setSkillId(id);
    dispatch(deleteSkill(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillsErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
      dispatch(clearAllSkillsErrors());
      setSkillId(""); // Reset skillId after delete action
    }
  }, [dispatch, loading, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Skills</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {skills.map((element) => {
                return (
                  <Card key={element._id}>
                    <CardHeader className="text-3xl font-bold flex items-center justify-between flex-row">
                      {element.name}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {loading && skillId === element._id ? (
                              <SpeacialDeleteButton />
                            ) : (
                              <Trash2
                                onClick={() => handleDeleteSkill(element._id)}
                                className="h-5 w-5 hover:text-red-500"
                              />
                            )}
                          </TooltipTrigger>
                          <TooltipContent side="right" style={{ color: "red" }}>
                            Delete
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardHeader>
                    <CardFooter>
                      <Label className="text-2xl mr-2">Proficiency</Label>
                      {element.proficiencyLevel && (
                        <Progress
                          value={
                            element.proficiencyLevel === "Beginner"
                              ? 50
                              : element.proficiencyLevel === "Intermediate"
                              ? 70
                              : element.proficiencyLevel === "Advanced"
                              ? 80
                              : element.proficiencyLevel === "Expert"
                              ? 90
                              : 0
                          }
                        />
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
