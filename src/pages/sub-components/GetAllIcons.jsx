import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { clearAllIconsErrors, deleteIcon, getAllIcons, resetIconsSlice } from '@/store/slices/iconsSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AlignJustify } from 'lucide-react';
const GetAllIcons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messages, loading, error, message, icons } = useSelector((state) => state.icon);
  const [iconId, setIconId] = useState("");

  const handleReturntoDashboard = () => {
    navigate("/dashboard");
  };

  const handleMessageDelete = (id) => {
    setIconId(id);
    dispatch(deleteIcon(id));
  };

  useEffect(() => {
    dispatch(getAllIcons()); // Initial fetch

    if (error) {
      toast.error(error);
      dispatch(clearAllIconsErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetIconsSlice());
    }
  }, [dispatch, error, message]);

  const renderIcon = (element) => {
    const { properties, styles, type, libraryType } = element;

    switch (type) {
      case 'className':
        if(libraryType==="FontAwesome"){
          return (
            <FontAwesomeIcon icon={`${properties.iconClassName} ${styles.className}`}
            style={{ color: styles.color, fontSize: styles.size }} />
            
          );
        }else{
        return (
          <i
            className={`${properties.iconClassName} ${styles.className}`}
            style={{ color: styles.color, fontSize: styles.size }}
          />
        );}
      case 'svg':
        return (
          <div
            dangerouslySetInnerHTML={{ __html: element.svgData }}
            style={{ color: styles.color, fontSize: styles.size }}
          />
        );
      case 'iconName':
        return (
          <i
            className={`icon-${properties.iconName} ${styles.className}`}
            style={{ color: styles.color, fontSize: styles.size }}
          />
        );
      case 'icon':
        return (
          <img
            src={properties.icon}
            alt={element.name}
            style={{ color: styles.color, width: styles.size, height: styles.size }}
          />
        );
      case 'file':
        return (
          <img
            src={properties.file}
            alt={element.name}
            style={{ color: styles.color, width: styles.size, height: styles.size }}
          />
        );
      case 'other':
        return <div>{properties.other}</div>;
      case 'tag':
        return <div>{properties.completeTag}</div>;
      default:
        return null;
    }
  };

  const renderDisplayLocations = (displayLocations) => {
    return Object.entries(displayLocations).map(([location, isVisible]) => (
      <CardDescription className="text-slate-950" key={location}>
        <span className='font-bold mr-2'>{location.charAt(0).toUpperCase() + location.slice(1)}:</span>
        <Switch checked={isVisible} disabled />
      </CardDescription>
    ));
  };

  return (
    <>
      <div className='min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20'>
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row items-center">
                <CardTitle>Icons</CardTitle>
                <Button className="w-fit" onClick={handleReturntoDashboard}>Return to Dashboard</Button>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {
                  icons && icons.length > 0 ? (
                    icons.map(element => (
                      <Card key={element._id} className="grid gap-2 pl-3 pt-2">
                        <CardDescription className="text-slate-950">
                          <span className='font-bold mr-2'>Icon Name:</span>
                          {element.name}
                        </CardDescription>
                        <CardDescription className="text-slate-950">
                          <span className='font-bold mr-2'>Type:</span>
                          {element.type}
                        </CardDescription>
                        <CardDescription className="text-slate-950">
                          <span className='font-bold mr-2'>Library:</span>
                          {element.libraryType}
                        </CardDescription>
                        <CardDescription className="text-slate-950">
                          <span className='font-bold mr-2'>Icon:</span>
                          {renderIcon(element)}
                        </CardDescription>
                        {renderDisplayLocations(element.displayLocations)}
                        <CardFooter className="justify-end">
                          {
                            loading && iconId === element._id
                              ? (<SpecialLoadingButton width={"w-32"} content={"Deleting..."} />)
                              : <Button className="w-32" onClick={() => handleMessageDelete(element._id)}>Delete</Button>
                          }
                        </CardFooter>
                      </Card>
                    ))
                  ) : loading ? "Loading Icons..." : "No Icons Found"
                }
              </CardContent>
              {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-pen-nib" /> */}
              {/* <i className="fa-sharp fa-solid fa-pen-nib fa-rotate-180 fa-2xs" style="color: #B197FC;"></i> */}
            </Card>
          </TabsContent>
        </Tabs>
        
      </div>
    </>
  );
};

export default GetAllIcons;
