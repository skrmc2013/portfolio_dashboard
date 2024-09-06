import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import React, { useEffect, useState } from 'react'
import ProgressButton from '../useable-components/ProgressButton'
import { Badge } from '@/components/ui/badge'
import StatusButton from '../useable-components/StatusButton'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'

const DashboardProject = ({ isEditable }) => {
    const { projects } = useSelector((state) => state.project);

    const handleToggleDeployed = () => {
        setDeployed((prevDeployed) => !prevDeployed);
    };

    const [showAll, setShowAll] = useState(false);
    const [displayedProjects, setDisplayedProjects] = useState([]);

    useEffect(() => {
        // Initially show 5 deployed projects
        const deployedProjects = projects.filter(project => project.deployed);
        setDisplayedProjects(deployedProjects.slice(0, 5));
    }, [projects]);

    const handleReadMore = () => {
        setDisplayedProjects(projects);
        setShowAll(true);
    };

    const handleShowLess = () => {
        const deployedProjects = projects.filter(project => project.deployed);
        setDisplayedProjects(deployedProjects.slice(0, 5));
        setShowAll(false);
    };

    return (
        <>
            <Tabs>
                <TabsContent>
                    <Card>
                        <CardHeader className="px-7">
                            <CardTitle>Projects</CardTitle>
                        </CardHeader>
                        <CardContent>
                            
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead className="hidden md:table-cell">Technologies</TableHead>
                                            <TableHead className="hidden md:table-cell">Status</TableHead>
                                            <TableHead className="hidden md:table-cell">Deployed</TableHead>
                                            <TableHead className="md:table-cell">Update</TableHead>
                                            <TableHead className="text-right">Visit</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {displayedProjects.length > 0 ? (
                                            displayedProjects.map((element) => (
                                                <TableRow className="bg-accent" key={element._id}>
                                                    <TableCell>
                                                        <div className="font-medium">{element.name}</div>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {element.technologies && element.technologies.length > 0 ? (
                                                            element.technologies.map((tech, index) => (
                                                                <div key={index}>
                                                                    <span dangerouslySetInnerHTML={{ __html: tech }} />
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div>Update record soon</div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {element.progress ? (
                                                            <div>
                                                                <ProgressButton
                                                                    percentage={element.progress.percentage}
                                                                    status={element.progress.status}
                                                                    disabled={isEditable}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div>Status unavailable</div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        <Badge className="text-xs" variant="secondary">
                                                            <StatusButton
                                                                status={element.deployed}
                                                                label={element.deployed ? 'Deployed' : 'Not Deployed'}
                                                                //   onClick={handleToggleDeployed}
                                                                isEditable={isEditable}
                                                                colorActive="bg-red-500"
                                                                colorInactive="bg-gray-300"
                                                            />
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="md:table-cell">
                                                        <Link to={`/update/project/${element._id}`}>
                                                            <Button>Update</Button>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Link to={element.projectLink} target="_blank">
                                                            <Button>Visit</Button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell className="text-3xl overflow-y-hidden">
                                                    You have not added any project.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    {/* <TableFooter className='bg-transparent grid place-items-center'> */}

                                    {/* </TableFooter> */}
                                </Table>
                        </CardContent>

                        <div className="flex text-center items-center justify-center mt-3 pb-2">
                            {!showAll && projects.filter(project => project.deployed).length > 4 && (
                                <Button onClick={handleReadMore}>Read More</Button>
                            )}
                            {showAll && (
                                <Button onClick={handleShowLess}>Show Less</Button>
                            )}
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}

export default DashboardProject