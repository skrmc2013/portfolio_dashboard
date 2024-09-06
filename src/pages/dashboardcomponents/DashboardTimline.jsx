import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardTimline = () => {
  const { timeline } = useSelector(state => state.timeline);
  const [showAll, setShowall] = useState(false);
  const [displayTimline, setDisplayTimeline] = useState([]);

  useEffect(() => {
    const displaytimeline = timeline.slice(0, 5);
    setDisplayTimeline(displaytimeline);
  }, [timeline]);


  const handReadMore = () => {
    setDisplayTimeline(timeline);
    setShowall(true);
  }

  const handShowLess
    = () => {
      const displaytimeline = timeline.slice(0, 5);
      setDisplayTimeline(displaytimeline);
      setShowall(false);
    }
  return (
    <>

      <Card>
        <CardHeader className="px-7 flex items-center justify-between flex-row">
          <CardTitle>Timeline</CardTitle>
          <Link to={"/manage/timeline"}>
            <Button
              // onClick={"gotoMangeTimeline"} 
              className="w-fit">
              Manage Timeline
            </Button>
            </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="md:table-cell">From</TableHead>
                <TableHead className="md:table-cell text-right">
                  To
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayTimline && displayTimline.length > 0 ? (
                displayTimline.map((element) => {
                  return (
                    <TableRow className="bg-accent" key={element._id}>
                      <TableCell className="font-medium">
                        {element.title}
                      </TableCell>
                      <TableCell className="md:table-cell">
                        {element.timeline.from}
                      </TableCell>
                      <TableCell className="md:table-cell  text-right">
                        {element.timeline.to ? `${element.timeline.to}` : "Present"}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell className="text-3xl overflow-y-hidden">
                    No timeline found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {/* <CardFooter> */}
        <div className='flex justify-center mt-2 pb-2'>
          {
            !showAll && timeline.length > 4 && (<Button onClick={handReadMore}>Read More</Button>)
          }
          {
            showAll && (<Button onClick={handShowLess}>Show Less</Button>)
          }
        </div>
        {/* </CardFooter> */}
      </Card>
      {/* <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Button onClick={"gotoMangeTimeline"} className="w-fit">
                      Manage Timeline
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="md:table-cell">From</TableHead>
                          <TableHead className="md:table-cell text-right">
                            To
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline.length > 0 ? (
                          timeline.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell className="font-medium">
                                  {element.title}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {element.timeline.from}
                                </TableCell>
                                <TableCell className="md:table-cell  text-right">
                                  {element.timeline.to? `${element.timeline.to}`: "Present"}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any timeline.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card> */}
    </>
  )
}

export default DashboardTimline