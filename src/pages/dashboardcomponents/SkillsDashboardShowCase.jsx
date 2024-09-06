import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const SkillsDashboardShowCase = () => {

  const { skills } = useSelector((state) => state.skill);
  // const SkillsCard = ({ skills }) => {
  const [showAll, setShowAll] = useState(false);
  const [displayedSkills, setDisplayedSkills] = useState([]);

  useEffect(() => {
    // Filter out skills based on your criteria
    const deployedSkills = skills.slice(0, 5); // Display only first 5 items initially
    setDisplayedSkills(deployedSkills);
  }, [skills]);

  const handleReadMore = () => {
    // Show all skills
    setDisplayedSkills(skills);
    setShowAll(true);
  };

  const handleShowLess = () => {
    // Show only deployed skills (first 5)
    const deployedSkills = skills.slice(0, 5);
    setDisplayedSkills(deployedSkills);
    setShowAll(false);
  };


  return (
    <>
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="px-7 gap-3">
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {displayedSkills && displayedSkills.length > 0 ? (
                displayedSkills.map((element) => (
                  <Card key={element._id}>
                    <CardHeader>{element.name}</CardHeader>
                    <CardFooter>
                      {element.proficiencyLevel && (
                        <Progress
                          value={
                            element.proficiencyLevel === 'Beginner' ? 50 :
                              element.proficiencyLevel === 'Intermediate' ? 70 :
                                element.proficiencyLevel === 'Advanced' ? 80 :
                                  element.proficiencyLevel === 'Expert' ? 90 :
                                    0
                          }
                        />
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <p className="text-3xl">No skill found.</p>
              )}
            </CardContent>
            <div className='flex justify-center mt-2 pb-2'>
              {
                !showAll && skills.length > 4 && (<Button onClick={handleReadMore}>Read More</Button>)
              }
              {
                showAll && (<Button onClick={handleShowLess}>Show Less</Button>)
              }
            </div>
          </Card>
          {/* <div className="flex justify-center mt-4">
          {!showAll && skills.length > 5 && (
            <button onClick={handleReadMore} className="bg-blue-500 text-white p-2 rounded">Read More</button>
          )}
          {showAll && (
            <button onClick={handleShowLess} className="bg-blue-500 text-white p-2 rounded">Show Less</button>
          )}
        </div> */}
        </TabsContent>
      </Tabs>
    </>
  )
}

export default SkillsDashboardShowCase