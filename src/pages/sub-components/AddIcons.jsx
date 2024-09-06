import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch'; // Make sure to import Switch component
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import VisibilityManager from './VisibilityManager';
import { useDispatch, useSelector } from 'react-redux';
import { addIcon, clearAllIconsErrors, getAllIcons, resetIconsSlice } from '@/store/slices/iconsSlice';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';
import ReusableFormSection from '../useable-components/ResuableFormSection';


const AddIcons = () => {
    const { loading, message, error } = useSelector(state => state.icon);

    const [iconType, setIconType] = useState("");
    const [libraryType, setLibraryType] = useState("");
    const [name, setName] = useState("");
    const [iconClassName, setIconClassName] = useState("");
    const [iconName, setIconName] = useState("");
    const [icon, setIcon] = useState("");
    const [file, setFile] = useState("");
    const [svgData, setSvgData] = useState("");
    const [iconTag, setIconTag] = useState("");
    const [lottieFilesData, setLottieFilesData] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [className, setClassName] = useState("");
    const [otherIcon, setOtherIcon] = useState("");
    const [packageName, setPackageName] = useState("");
    const [importPath, setImportPath] = useState("");
    const [componentName, setComponentName] = useState("");
    const [componentPath, setComponentPath] = useState("");
    const [iconData, setIconData] = useState({
        // Other icon fields...
        visibility: []
    });

    const [displayLocations, setDisplayLocations] = useState({
        homepage: true,
        skillsSection: true,
        projectSection: false,
        footer: true
    });
    // const [visibility, setVisibility] = useState(new Map());

    const handleSwitchChange = (key, value) => {
        setDisplayLocations(prev => ({ ...prev, [key]: value }));
    };
    const iconWebsites = {
        lottiefiles: 'https://lottiefiles.com/search?q=login&category=animations',
        LUCIDE: 'https://lucide.dev/icons/container',
        icon8: 'https://icons8.com/icon/set/popular/ios-glyphs',
        iconify: 'https://icon-sets.iconify.design/',
        fontawesome: 'https://fontawesome.com/icons/categories/coding',
    };

    // Handler for changing selection
    const handleIconWebsiteChange = (value) => {
        const url = iconWebsites[value];
        if (url) {
            window.open(url, '_blank');
        }
    };
    // const handleVisibilityChange = (key, value) => {
    //     setVisibility(prev => new Map(prev).set(key, value));
    // };

    const dispatch = useDispatch();
    // const [iconData, setIconData] = useState({ visibility: [] });

    // const handleVisibilityUpdate = (updatedVisibility) => {
    //     setIconData(prev => ({ ...prev, visibility: updatedVisibility }));
    // };
    // const [visibility, setVisibility] = useState([]);

    // const handleVisibilityUpdate = (updatedVisibility) => {
    //   setVisibility(updatedVisibility);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('type', iconType);
        formData.append('libraryType', libraryType);
        formData.append('iconClassName', iconClassName);
        formData.append('iconName', iconName);
        formData.append('icon', icon);
        formData.append('file', file);
        formData.append('other', otherIcon);
        formData.append('completeTag', iconTag);
        formData.append('svgData', svgData);
        formData.append('lottieFilesData', lottieFilesData);
        formData.append('size', size);
        formData.append('color', color);
        formData.append('className', className);
        formData.append('homepage', displayLocations.homepage);
        formData.append('skillsSection', displayLocations.skillsSection);
        formData.append('projectSection', displayLocations.projectSection);
        formData.append('footer', displayLocations.footer);
        formData.append('packageName', packageName);
        formData.append('importPath', importPath);
        formData.append('componentName', componentName);
        formData.append('componentPath', componentPath);

        dispatch(addIcon(formData));
    };


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllIconsErrors());
            dispatch(getAllIcons());
        }
        if (message) {
            toast.success(message);
            dispatch(clearAllIconsErrors());
            dispatch(getAllIcons());
            dispatch(resetIconsSlice());
        }
    }, [error, message])
    return (
        <>
            <ReusableFormSection title={"Icons"} description={"Add New Icons"}>
                <div className='grid gap-2'>
                    {/* <Label>Preferred Websites</Label> */}
                    <Select onValueChange={handleIconWebsiteChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Preferred Icons websites Link" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Icons Websites Preferred</SelectLabel>
                                <SelectItem value="lottiefiles">LottieFiles</SelectItem>
                                <SelectItem value="LUCIDE">Lucide</SelectItem>
                                <SelectItem value="icon8">ICON8</SelectItem>
                                <SelectItem value="iconify">Iconify</SelectItem>
                                <SelectItem value="fontawesome">Font Awesome</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='grid gap-2'>
                    <Label>Icon Name</Label>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className='grid gap-2'>
                    <Label htmlFor="type">Icon Type</Label>
                    <Select  >
                        <SelectTrigger id="icontype">
                            <SelectValue placeholder="Select Icon Type" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="svg">SVG</SelectItem>
                            <SelectItem value="className">Class Name</SelectItem>
                            <SelectItem value="iconName">Icon Name</SelectItem>
                            <SelectItem value="icon">Icon</SelectItem>
                            <SelectItem value="tag">Tag</SelectItem>
                            <SelectItem value="file">File</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='grid gap-2'>
                    <Label htmlFor="libraryType">Library Type</Label>
                    <Select onValueChange={(value) => setLibraryType(value)}>
                        <SelectTrigger id="libraryType">
                            <SelectValue placeholder="Select Library Type" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="FontAwesome">Font Awesome</SelectItem>
                            <SelectItem value="Google">Google</SelectItem>
                            <SelectItem value="MaterialIcons">Material Icons</SelectItem>
                            <SelectItem value="LottieFiles">LottieFiles</SelectItem>
                            <SelectItem value="reactLucide">React Lucide</SelectItem>
                            <SelectItem value="Custom">Custom</SelectItem>
                            <SelectItem value="iconify">Iconify</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {iconType && libraryType && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Properties</CardTitle>
                            <CardDescription>Specify the properties based on icon type and library type</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {libraryType === "FontAwesome" && iconType === "className" && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Font Awesome</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        <Label>Icon Name</Label>
                                        <Input type="text" value={iconName} onChange={(e) => setIconName(e.target.value)} placeholder="Icon name" />
                                        <Label>Class Name</Label>
                                        <Input type="text" value={iconClassName} onChange={(e) => setIconClassName(e.target.value)} placeholder="Class name" />

                                    </CardContent>
                                </Card>
                            )}
                            {libraryType === "FontAwesome" && iconType === "tag" && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Font Awesome</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        <Label>Icon Name</Label>
                                        <Input type="text" value={iconName} onChange={(e) => setIconName(e.target.value)} placeholder="Icon name" />
                                        <Label>Complete Icon Tag</Label>
                                        <Input type="text" value={iconTag} onChange={(e) => setIconTag(e.target.value)} placeholder={`<i class="fa-solid fa-pen-nib"></i> || <FontAwesomeIcon icon="fa-solid fa-pen-nib" /> || <font-awesome-icon :icon="['fas', 'pen-nib']" />`} />

                                    </CardContent>
                                </Card>
                            )}

                            {iconType === "svg" && libraryType === "FontAwesome" && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>SVG</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        <Label>SVG Data</Label>
                                        <Textarea type="text" value={svgData} onChange={(e) => setSvgData(e.target.value)} placeholder={`Paste complete SVG tag data here ! \n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M368.4 18.3L312.7 74.1 437.9 199.3l55.7-55.7c21.9-21.9 21.9-57.3 0-79.2L447.6 18.3c-21.9-21.9-57.3-21.9-79.2 0zM288 94.6l-9.2 2.8L134.7 140.6c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-3.8 11.3-1 23.9 7.3 32.4L164.7 324.7c-3-6.3-4.7-13.3-4.7-20.7c0-26.5 21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48c-7.4 0-14.4-1.7-20.7-4.7L33.7 500.9c8.6 8.3 21.1 11.2 32.4 7.3l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 2.7-9.2L288 94.6z"/></svg> `} />
                                    </CardContent>
                                </Card>
                            )}

                            {iconType === "svg" && libraryType === "LottieFiles" && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Lottiefiles Icon Data</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        <Label>SVG Data</Label>
                                        <Textarea type="text" value={lottieFilesData} onChange={(e) => setLottieFilesData(e.target.value)} placeholder={`Paste complete SVG tag data here ! <DotLottieReact
                                                       src="path/to/animation.lottie" loop autoplay
                                                      > \n OR \n <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script><dotlottie-player src="https://lottie.host/9d7c359a-0586-419e-a8a2-3af6a4ee44d2/iDuOEdpoiY.json" background="transparent" speed="1" style="width: 300px; height: 300px" direction="1" playMode="bounce" loop controls autoplay></dotlottie-player>   `} />
                                    </CardContent>
                                </Card>
                            )}

                            {iconType === "file" && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Custom Icon</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        <Label>File Path/Link</Label>
                                        <Input type="text" value={file} onChange={(e) => setFile(e.target.value)} placeholder="File path or link" />
                                    </CardContent>
                                </Card>
                            )}
                            {iconType === "icon" || iconType === "tag" && libraryType === "reactLucide" && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>React Lucide Icon</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        <Label>Paste Tag here</Label>
                                        {/* <Input type="text" value={reactLucideIconTag} onChange={(e) => setReactLucideIconTag(e.target.value)} placeholder={`<MonitorCog/> || <MonitorCog/>`} /> */}
                                        <Input type="text" value={iconTag} onChange={(e) => setIconTag(e.target.value)} placeholder={`<MonitorCog/> || <MonitorCog/>`} />

                                    </CardContent>
                                    <CardContent className="grid gap-4">
                                        <Label>SVG Code</Label>
                                        <Textarea type="text" value={svgData} onChange={(e) => setSvgData(e.target.value)} placeholder={`Paste complete SVG tag data here ! \n<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-cog"><path d="M12 17v4"/><path d="m15.2 4.9-.9-.4"/><path d="m15.2 7.1-.9.4"/><path d="m16.9 3.2-.4-.9"/><path d="m16.9 8.8-.4.9"/><path d="m19.5 2.3-.4.9"/><path d="m19.5 9.7-.4-.9"/><path d="m21.7 4.5-.9.4"/><path d="m21.7 7.5-.9-.4"/><path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><path d="M8 21h8"/><circle cx="18" cy="6" r="3"/></svg> `} />

                                    </CardContent>
                                </Card>
                            )}
                            {iconType === "svg" || iconType === "icon" && libraryType === "iconify" && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Iconify Icon</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        <Label>Paste Tag here</Label>
                                        {/* <Input type="text" value={iconifyIconTag} onChange={(e) => setIconifyIconTag(e.target.value)} placeholder={`Enter Tag here`} /> */}

                                        <Input type="text" value={iconTag} onChange={(e) => setIconTag(e.target.value)} placeholder={`Enter Tag here`} />

                                    </CardContent>
                                    <CardContent className="grid gap-4">
                                        <Label>SVG Code</Label>
                                        <Textarea type="text" value={svgData} onChange={(e) => setSvgData(e.target.value)} placeholder={`Paste complete SVG tag data here ! \n<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-cog"><path d="M12 17v4"/><path d="m15.2 4.9-.9-.4"/><path d="m15.2 7.1-.9.4"/><path d="m16.9 3.2-.4-.9"/><path d="m16.9 8.8-.4.9"/><path d="m19.5 2.3-.4.9"/><path d="m19.5 9.7-.4-.9"/><path d="m21.7 4.5-.9.4"/><path d="m21.7 7.5-.9-.4"/><path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><path d="M8 21h8"/><circle cx="18" cy="6" r="3"/></svg> `} />
                                    </CardContent>
                                </Card>
                            )}
                            {iconType === "other" && libraryType === "Custom" || libraryType === "Others" && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Custom Icon</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        <Label>Icon Name</Label>
                                        <Input type="text" value={iconName} onChange={(e) => setIconName(e.target.value)} placeholder="Icon name" />
                                        <Label>Icon Class Name</Label>
                                        <Input type="text" value={iconClassName} onChange={(e) => setIconClassName(e.target.value)} placeholder="Class name" />

                                        <Label>Paste Tag here</Label>
                                        {/* <Input type="text" value={iconifyIconTag} onChange={(e) => setIconifyIconTag(e.target.value)} placeholder={`Enter Tag here`} /> */}
                                        <Input type="text" value={iconTag} onChange={(e) => setIconTag(e.target.value)} placeholder={`Enter Tag here`} />

                                        <Label>SVG Code</Label>
                                        <Textarea type="text" value={svgData} onChange={(e) => setSvgData(e.target.value)} placeholder={`Paste complete SVG tag data here ! \n<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-cog"><path d="M12 17v4"/><path d="m15.2 4.9-.9-.4"/><path d="m15.2 7.1-.9.4"/><path d="m16.9 3.2-.4-.9"/><path d="m16.9 8.8-.4.9"/><path d="m19.5 2.3-.4.9"/><path d="m19.5 9.7-.4-.9"/><path d="m21.7 4.5-.9.4"/><path d="m21.7 7.5-.9-.4"/><path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><path d="M8 21h8"/><circle cx="18" cy="6" r="3"/></svg> `} />
                                        {/* <Label>Icon Name</Label> */}
                                        {/* <Input type="text" value={iconName} onChange={(e) => setIconName(e.target.value)} placeholder="Icon name" /> */}
                                        {/* <Label>Complete Icon Tag</Label>
                                            <Input type="text" value={iconTag} onChange={(e) => setIconTag(e.target.value)} placeholder={`<i class="fa-solid fa-pen-nib"></i> || <FontAwesomeIcon icon="fa-solid fa-pen-nib" /> || <font-awesome-icon :icon="['fas', 'pen-nib']" />`} /> */}
                                        <Label>File Path/Link</Label>
                                        <Input type="text" value={file} onChange={(e) => setFile(e.target.value)} placeholder="File path or link" />
                                        <Label>Other Icon</Label>
                                        <Input type="text" value={otherIcon} onChange={(e) => setOtherIcon(e.target.value)} placeholder="File path or link" />
                                        {/* <Label>SVG Code</Label>
                                            <Textarea type="text" value={svgData} onChange={(e) => setSvgData(e.target.value)} placeholder={`Paste complete SVG tag data here ! \n<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-cog"><path d="M12 17v4"/><path d="m15.2 4.9-.9-.4"/><path d="m15.2 7.1-.9.4"/><path d="m16.9 3.2-.4-.9"/><path d="m16.9 8.8-.4.9"/><path d="m19.5 2.3-.4.9"/><path d="m19.5 9.7-.4-.9"/><path d="m21.7 4.5-.9.4"/><path d="m21.7 7.5-.9-.4"/><path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><path d="M8 21h8"/><circle cx="18" cy="6" r="3"/></svg> `} /> */}

                                        {/* <Label>Paste Tag here</Label> */}
                                        {/* <Input type="text" value={reactLucideIconTag} onChange={(e) => setReactLucideIconTag(e.target.value)} placeholder={`<MonitorCog/> || <MonitorCog/>`} /> */}

                                    </CardContent>
                                </Card>
                            )}

                        </CardContent>
                    </Card>
                )
                }
                <Card>
                    <CardHeader>
                        <CardTitle>Packages need to be installed(Enter if required)</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Label>Package name</Label>
                        {/* <Input type="text" value={reactLucideIconTag} onChange={(e) => setReactLucideIconTag(e.target.value)} placeholder={`<MonitorCog/> || <MonitorCog/>`} /> */}
                        <Input type="text" value={packageName} onChange={(e) => setPackageName(e.target.value)} placeholder={`@lottiefiles/dotlottie-react`} />
                        <Label>Import Path</Label>
                        <Input type="text" value={importPath} onChange={(e) => setImportPath(e.target.value)} placeholder={`"@lottiefiles/dotlottie-react",`} />

                    </CardContent>
                    <CardContent className="grid gap-4">
                        <Label>Component Name</Label>
                        <Input type="text" value={componentName} onChange={(e) => setComponentName(e.target.value)} placeholder={`"@lottiefiles/dotlottie-react",`} />
                        <Label>Component Path</Label>
                        <Input type="text" value={componentPath} onChange={(e) => setComponentPath(e.target.value)} placeholder={`"@lottiefiles/dotlottie-react",`} />

                    </CardContent>
                </Card>
                <div className='grid gap-2'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Styling</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">

                            <Label>Size</Label>
                            <Input type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder={`Enter size in px: 16px`} />

                            <Label>Color</Label>
                            <Textarea type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder={`#000000`} />
                            <Label>class Name</Label>
                            <Input type="color" value={className} onChange={(e) => setClassName(e.target.value)} placeholder="class name" />

                        </CardContent>
                    </Card>

                </div>

                <div className='grid gap-2'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Display Locations</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {Object.keys(displayLocations).map((location) => (
                                <div className="flex items-center space-x-4" key={location}>
                                    <Label>{location.charAt(0).toUpperCase() + location.slice(1)}</Label>
                                    <Switch
                                        checked={displayLocations[location]}
                                        onCheckedChange={(value) => handleSwitchChange(location, value)}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className='grid gap-2'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Visibility</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {/* {Array.from(visibility.keys()).map((key) => (
                                    <div className="flex items-center space-x-4" key={key}>
                                        <Label>{key}</Label>
                                        <Switch
                                            checked={visibility.get(key) || false}
                                            onCheckedChange={(value) => handleVisibilityChange(key, value)}
                                        />
                                    </div>
                                ))} */}

                            {/* <VisibilityManager
                                    visibilityEntries={iconData.visibility}
                                    setVisibilityEntries={(entries) => setIconData({ ...iconData, visibility: entries })}
                                /> */}
                            {/* <VisibilityManager onVisibilityUpdate={handleVisibilityUpdate} /> */}

                            {/* <VisibilityManager onVisibilityUpdate={handleVisibilityUpdate} initialVisibility={visibility} /> */}
                            {/* <VisibilityManager onVisibilityUpdate={handleVisibilityUpdate} /> */}
                        </CardContent>
                    </Card>
                </div>

                <div className='grid gap-2'>
                    {/* <Button className="w-full" onClick={handleAddIcon} >Add Icon</Button> */}
                    {/* <Button className="w-full" onClick={handleSubmit} >Add Icon</Button> */}
                    <CardFooter className="justify-end">
                        {
                            loading ? (<SpecialLoadingButton width={"w-full"} content={"Adding..."} />) : <Button type="submit" className="w-32" onClick={handleSubmit} >Add Icon</Button>
                        }
                    </CardFooter>
                </div>
            </ReusableFormSection>
        </>





    );
}

export default AddIcons;
