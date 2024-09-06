import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DashboardTimline from './DashboardTimline';
import { Button } from '@/components/ui/button';
import { clearAllAppiconsErrors, deleteAppicon, getAllAppicons } from '@/store/slices/appSlice';
import { toast } from 'react-toastify';
import SpecialLoadingButton from '../sub-components/SpecialLoadingButton';




const DashboardApps = () => {

    const { appicons, loading, error, message } = useSelector(state => state.app);

    const [showAll, setShowAll] = useState(false);
    const [displayApps, setDisplayApp] = useState([]);

    useEffect(() => {
        // const displayapp = appicons.slice(0, 5);
        // setDisplayApp(displayapp);
        // setShowAll(true);
        if (appicons && appicons.length > 0) {
            const displayapp = appicons.slice(0, 5);
            setDisplayApp(displayapp);
            setShowAll(true);
        }

    }, [appicons])

    const handleShowMore = () => {
        setDisplayApp(appicons);
        setShowAll(true);

    }
    const handleShowLess = () => {
        const displayapp = appicons.slice(0, 5);
        setShowAll(false);
    }
    const dispatch = useDispatch();

    const [appId, setAppId] = useState("");

    const handleDeleteSoftwareApp = (id) => {
        setAppId(id);
 dispatch(deleteAppicon(id));
    }
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearAllAppiconsErrors());
            
        }
        if(message){
            toast.success(message);
            dispatch(clearAllAppiconsErrors());
            dispatch(getAllAppicons());
        }
    }, [error, message, dispatch])
    return (
        <>
            <Tabs>

                <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="px-7">
                            <CardTitle>Tools</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead className="md:table-cell">Icon</TableHead>
                                        <TableHead className="md:table-cell text-center">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {displayApps &&
                                        displayApps.length > 0 ? (
                                        displayApps.map((element) => {
                                            return (
                                                <TableRow className="bg-accent" key={element._id}>
                                                    <TableCell className="font-medium">
                                                        {element.title}
                                                    </TableCell>
                                                    <TableCell className="md:table-cell">
                                                        <img
                                                            className="w-7 h-7"
                                                            src={element.svg && element.svg.url}
                                                            alt={element.name}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="md:table-cell  text-center">
                                                        {loading && appId === element._id ? (
                                                            <SpecialLoadingButton
                                                                content={"Deleting . . . ."}
                                                                width={"w-fit"}
                                                            />
                                                        ) : (
                                                            <Button
                                                                onClick={() =>
                                                                    handleDeleteSoftwareApp(element._id)
                                                                }
                                                            >
                                                                Delete
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell className="text-3xl overflow-y-hidden">
                                              No App Found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <div className='flex justify-center mt-2 pb-2'>
                            {
                               !showAll && (appicons?.length > 4) && (<Button onClick={handleShowMore}>Read More</Button>)

                            }
                            {
                                showAll && (<Button onClick={handleShowLess}>Show Less</Button>)
                            }
                        </div>
                    </Card>
                    <DashboardTimline />
                </TabsContent>
            </Tabs>
        </>
    )
}

export default DashboardApps


/**
 
 <>
            <Tabs>

                <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="px-7">
                            <CardTitle>Tools</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead className="md:table-cell">Icon</TableHead>
                                        <TableHead className="md:table-cell text-center">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appicons &&
                                        appicons.length > 0 ? (
                                        appicons.map((element) => {
                                            return (
                                                <TableRow className="bg-accent" key={element._id}>
                                                    <TableCell className="font-medium">
                                                        {element.title}
                                                    </TableCell>
                                                    <TableCell className="md:table-cell">
                                                        <img
                                                            className="w-7 h-7"
                                                            src={element.svg && element.svg.url}
                                                            alt={element.name}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="md:table-cell  text-center">
                                                         {appLoading && appId === element._id ? (
                                                            <SpecialLoadingButton
                                                                content={"Deleting"}
                                                                width={"w-fit"}
                                                            />
                                                        ) : (
                                                            <Button
                                                                onClick={() =>
                                                                    handleDeleteSoftwareApp(element._id)
                                                                }
                                                            >
                                                                Delete
                                                            </Button>
                                                        )} 
                                                        </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                            ) : (
                                                <TableRow>
                                                    <TableCell className="text-3xl overflow-y-hidden">
                                                        You have not added any skill.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                            <DashboardTimline/>
                            </TabsContent>
                    </Tabs>
                </>
 */