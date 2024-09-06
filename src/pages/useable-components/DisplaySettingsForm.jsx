import React, { useState, useEffect } from 'react';

// Custom Switch Component
const CustomSwitch = ({ checked, onChange }) => {
    return (
        <button
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none ${checked ? 'bg-blue-500' : 'bg-gray-400'}`}
        >
            <span
                className={`block h-6 w-6 rounded-full bg-white shadow-lg transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}
            ></span>
        </button>
    );
};

const DisplaySettingsForm = ({ settings, onSave }) => {
    const [localSettings, setLocalSettings] = useState(settings);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleChange = (section, field) => (checked) => {
        setLocalSettings((prevSettings) => ({
            ...prevSettings,
            [section]: {
                ...prevSettings[section],
                [field]: checked,
            },
        }));
    };

    const handleSave = () => {
        try {
            const formData = {};
            for (const section in localSettings) {
                formData[section] = {};
                for (const field in localSettings[section]) {
                    formData[section][field] = localSettings[section][field];
                }
            }
            // Basic validation: Ensure no section or field is missing
            if (Object.keys(formData).length === 0) {
                throw new Error('No settings data available');
            }
            onSave(formData);
            setErrors(null); // Clear any previous errors
        } catch (error) {
            setErrors(error.message);
        }
    };

    const handleReset = () => {
        setLocalSettings(settings);
        setErrors(null); // Clear any previous errors
    };

    return (
        <div className="w-full sm:col-span-4 pb-5">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">
                        Display Settings
                    </h3>
                </div>
                <div className="p-6 pt-0 grid gap-4">
                    {Object.keys(localSettings).map((section) => (
                        <div key={section} className="mb-4">
                            <h4 className="text-xl font-semibold leading-none tracking-tight mb-2">
                                {section.replace(/([A-Z])/g, ' $1').toUpperCase()}
                            </h4>
                            {Object.keys(localSettings[section]).map((field) => (
                                <div key={field} className="flex items-center justify-between  space-x-4 mb-2">
                                    <label className="text-sm font-medium leading-none">
                                        {field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                    </label>
                                    <CustomSwitch
                                        checked={localSettings[section][field]}
                                        onChange={handleChange(section, field)}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {errors && (
                    <div className="text-red-500 text-sm mt-2">
                        {errors}
                    </div>
                )}
                <div className="flex space-x-4 mt-3 p-5">
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save Settings
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Reset All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DisplaySettingsForm;

// import React, { useState, useEffect } from 'react';
// import Switch from 'react-switch'; // Assuming you're using this, otherwise use a custom switch component.

// const DisplaySettingsForm = ({ settings, onSave }) => {
//     const [localSettings, setLocalSettings] = useState(settings);

//     useEffect(() => {
//         // Reset settings to initial state when component is mounted or settings change
//         setLocalSettings(settings);
//     }, [settings]);

//     const handleChange = (section, field) => (checked) => {
//         setLocalSettings((prevSettings) => ({
//             ...prevSettings,
//             [section]: {
//                 ...prevSettings[section],
//                 [field]: checked,
//             },
//         }));
//     };

//     const handleSave = () => {
//         // Convert state to an object to submit
//         const formData = {};
//         for (const section in localSettings) {
//             formData[section] = {};
//             for (const field in localSettings[section]) {
//                 formData[section][field] = localSettings[section][field];
//             }
//         }
//         onSave(formData); // Pass the formData object to the onSave function from parent component
//     };

//     const handleReset = () => {
//         // Reset settings to the original settings passed from the parent component
//         setLocalSettings(settings);
//     };

//     return (
//         <div className="w-full sm:col-span-4">
//             <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
//                 <div className="flex flex-col space-y-1.5 p-6">
//                     <h3 className="text-2xl font-semibold leading-none tracking-tight">
//                         Display Settings
//                     </h3>
//                 </div>
//                 <div className="p-6 pt-0 grid gap-4">
//                     {Object.keys(localSettings).map((section) => (
//                         <div key={section}>
//                             <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">
//                                 {section.replace(/([A-Z])/g, ' $1').toUpperCase()}
//                             </h3>
//                             {Object.keys(localSettings[section]).map((field) => (
//                                 <div key={field} className="flex items-center space-x-4">
//                                     <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                                         {field.replace(/([A-Z])/g, ' $1').toUpperCase()}
//                                     </label>
//                                     <Switch
//                                         checked={localSettings[section][field]}
//                                         onChange={handleChange(section, field)}
//                                         offColor="#888"
//                                         onColor="#0d6efd"
//                                         className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input mt-1 mb-1"
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="flex space-x-4 mt-4">
//                 <button
//                     onClick={handleSave}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                     Save Settings
//                 </button>
//                 <button
//                     onClick={handleReset}
//                     className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 >
//                     Reset All
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default DisplaySettingsForm;

// update . . .
// import React, { useState } from 'react';
// import Switch from 'react-switch'; // or your preferred switch library

// const DisplaySettingsForm = ({ settings, onSave }) => {
//     const [localSettings, setLocalSettings] = useState(settings);

//     // Handle change for the switches
//     const handleChange = (section, field) => (checked) => {
//         setLocalSettings((prevSettings) => ({
//             ...prevSettings,
//             [section]: {
//                 ...prevSettings[section],
//                 [field]: checked,
//             },
//         }));
//     };

//     // Handle save button
//     const handleSave = () => {
//         // Convert state to FormData
//         const formData = new FormData();
//         for (const section in localSettings) {
//             for (const field in localSettings[section]) {
//                 formData.append(`${section}.${field}`, localSettings[section][field]);
//             }
//         }
//         onSave(formData);
//     };

//     return (
//         <div className="w-full sm:col-span-4">
//             <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
//                 <div className="flex flex-col space-y-1.5 p-6">
//                     <h3 className="text-2xl font-semibold leading-none tracking-tight">
//                         Display Settings
//                     </h3>
//                 </div>
//                 <div className="p-6 pt-0 grid gap-4">
//                     {Object.keys(localSettings).map((section) => (
//                         <div key={section}>
//                             <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">
//                                 {section.replace(/([A-Z])/g, ' $1').toUpperCase()}
//                             </h3>
//                             {Object.keys(localSettings[section]).map((field) => (
//                                 <div key={field} className="flex items-center space-x-4">
//                                     <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                                         {field.replace(/([A-Z])/g, ' $1').toUpperCase()}
//                                     </label>
//                                     <Switch
//                                         checked={localSettings[section][field]}
//                                         onChange={handleChange(section, field)}
//                                         offColor="#888"
//                                         onColor="#0d6efd"
//                                         className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <button
//                 onClick={handleSave}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//                 Save Settings
//             </button>
//         </div>
//     );
// };

// export default DisplaySettingsForm;

// update . . .
// import React, { useState, useCallback } from 'react';
// import Switch from 'react-switch'; // or your preferred switch library
// import { useTranslation } from 'react-i18next'; // For localization support

// const DisplaySettingsForm = ({ settings, onSave }) => {
//     const { t } = useTranslation();
//     const [localSettings, setLocalSettings] = useState(settings);
//     const [loading, setLoading] = useState(false);

//     // Handle switch change
//     const handleChange = useCallback((section, field) => (checked) => {
//         setLocalSettings((prevSettings) => ({
//             ...prevSettings,
//             [section]: {
//                 ...prevSettings[section],
//                 [field]: checked,
//             },
//         }));
//     }, []);

//     // Handle form reset
//     const handleReset = () => {
//         setLocalSettings(settings); // Reset to initial settings
//     };

//     // Handle save settings
//     const handleSave = async () => {
//         setLoading(true);
//         try {
//             if (validateSettings(localSettings)) {
//                 await fetch('/api/save-settings', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(localSettings),
//                 });
//                 console.log('Settings saved successfully:', localSettings);
//             } else {
//                 console.log('Validation failed');
//             }
//         } catch (error) {
//             console.error('Error saving settings:', error);
//             alert('Failed to save settings');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Optional validation function
//     const validateSettings = (settings) => {
//         // Add validation logic as needed
//         return true;
//     };

//     return (
//         <div className="w-full sm:col-span-4">
//             {/* Main Container */}
//             <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
//                 <div className="flex flex-col space-y-4 p-6">
//                     <h2 className="text-2xl font-semibold leading-none tracking-tight">
//                         {t('settings.title')}
//                     </h2>
//                     {/* Settings Sections */}
//                     {Object.keys(localSettings).map((section) => (
//                         <div key={section} className="border-b border-gray-200 pb-4 mb-4">
//                             <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">
//                                 {t(`settings.${section}`)}
//                             </h3>
//                             <div className="grid gap-4">
//                                 {Object.keys(localSettings[section]).map((field) => (
//                                     <div key={field} className="flex items-center space-x-4">
//                                         <label className="text-sm font-medium leading-none">
//                                             {t(`settings.fields.${field}`)}
//                                         </label>
//                                         <Switch
//                                             checked={localSettings[section][field]}
//                                             onChange={handleChange(section, field)}
//                                             offColor="#888"
//                                             onColor="#0d6efd"
//                                             className="inline-flex h-6 w-11 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {/* Action Buttons */}
//             <div className="flex space-x-4 mt-4">
//                 <button 
//                     onClick={handleSave} 
//                     disabled={loading}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
//                 >
//                     {loading ? t('buttons.saving') : t('buttons.save')}
//                 </button>
//                 <button 
//                     onClick={handleReset} 
//                     className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 >
//                     {t('buttons.reset')}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default DisplaySettingsForm;

// import React, { useState, useCallback } from 'react';
// import Switch from 'react-switch'; // or your preferred switch library
// import { useTranslation } from 'react-i18next'; // For localization support

// const DisplaySettingsForm = ({ settings, onSave }) => {
//     const { t } = useTranslation();
//     const [localSettings, setLocalSettings] = useState(settings);
//     const [loading, setLoading] = useState(false);

//     // Handle switch change
//     const handleChange = useCallback((section, field) => (checked) => {
//         setLocalSettings((prevSettings) => ({
//             ...prevSettings,
//             [section]: {
//                 ...prevSettings[section],
//                 [field]: checked,
//             },
//         }));
//     }, []);

//     // Handle form reset
//     const handleReset = () => {
//         setLocalSettings(settings); // Reset to initial settings
//     };

//     // Handle save settings
//     const handleSave = async () => {
//         setLoading(true);
//         try {
//             if (validateSettings(localSettings)) {
//                 await fetch('/api/save-settings', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(localSettings),
//                 });
//                 console.log('Settings saved successfully:', localSettings);
//             } else {
//                 console.log('Validation failed');
//             }
//         } catch (error) {
//             console.error('Error saving settings:', error);
//             alert('Failed to save settings');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Optional validation function
//     const validateSettings = (settings) => {
//         // Add validation logic as needed
//         return true;
//     };

//     return (
//         <div className="w-full sm:col-span-4">
//             {/* Main Container */}
//             <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
//                 <div className="flex flex-col space-y-4 p-6">
//                     <h2 className="text-2xl font-semibold leading-none tracking-tight">
//                         {t('settings.title')}
//                     </h2>
//                     {/* Settings Sections */}
//                     {Object.keys(localSettings).map((section) => (
//                         <div key={section} className="border-b border-gray-200 pb-4 mb-4">
//                             <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">
//                                 {t(`settings.${section}`)}
//                             </h3>
//                             <div className="grid gap-4">
//                                 {Object.keys(localSettings[section]).map((field) => (
//                                     <div key={field} className="flex items-center space-x-4">
//                                         <label className="text-sm font-medium leading-none">
//                                             {t(`settings.fields.${field}`)}
//                                         </label>
//                                         <Switch
//                                             checked={localSettings[section][field]}
//                                             onChange={handleChange(section, field)}
//                                             offColor="#888"
//                                             onColor="#0d6efd"
//                                             className="inline-flex h-6 w-11 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {/* Action Buttons */}
//             <div className="flex space-x-4 mt-4">
//                 <button 
//                     onClick={handleSave} 
//                     disabled={loading}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
//                 >
//                     {loading ? t('buttons.saving') : t('buttons.save')}
//                 </button>
//                 <button 
//                     onClick={handleReset} 
//                     className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 >
//                     {t('buttons.reset')}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default DisplaySettingsForm;

// update . . . 
// import React, { useState, useCallback } from 'react';
// import Switch from 'react-switch'; // or your preferred switch library
// import { useTranslation } from 'react-i18next'; // For localization support

// const DisplaySettingsForm = ({ settings, onSave }) => {
//     const { t } = useTranslation();
//     const [localSettings, setLocalSettings] = useState(settings);
//     const [loading, setLoading] = useState(false);

//     // Handle switch change
//     const handleChange = useCallback((section, field) => (checked) => {
//         setLocalSettings((prevSettings) => ({
//             ...prevSettings,
//             [section]: {
//                 ...prevSettings[section],
//                 [field]: checked,
//             },
//         }));
//     }, []);

//     // Handle form reset
//     const handleReset = () => {
//         setLocalSettings(settings); // Reset to initial settings
//     };

//     // Handle save settings
//     const handleSave = async () => {
//         setLoading(true);
//         try {
//             if (validateSettings(localSettings)) {
//                 await fetch('/api/save-settings', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(localSettings),
//                 });
//                 console.log('Settings saved successfully:', localSettings);
//             } else {
//                 console.log('Validation failed');
//             }
//         } catch (error) {
//             console.error('Error saving settings:', error);
//             alert('Failed to save settings');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Optional validation function
//     const validateSettings = (settings) => {
//         // Add validation logic as needed
//         return true;
//     };

//     return (
//         <div className="w-full sm:col-span-4">
//             {Object.keys(localSettings).map((section) => (
//                 <div key={section} className="rounded-lg border bg-card text-card-foreground shadow-sm mb-4">
//                     <div className="flex flex-col space-y-1.5 p-6">
//                         <h2 className="text-2xl font-semibold leading-none tracking-tight">
//                             {t(`settings.${section}`)}
//                         </h2>
//                         <div className="p-6 pt-0 grid gap-4">
//                             {Object.keys(localSettings[section]).map((field) => (
//                                 <div key={field} className="flex items-center space-x-4">
//                                     <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                                         {t(`settings.fields.${field}`)}
//                                     </label>
//                                     <Switch
//                                         checked={localSettings[section][field]}
//                                         onChange={handleChange(section, field)}
//                                         offColor="#888"
//                                         onColor="#0d6efd"
//                                         className="inline-flex h-6 w-11 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//             <div className="flex space-x-4">
//                 <button 
//                     onClick={handleSave} 
//                     disabled={loading}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
//                 >
//                     {loading ? t('buttons.saving') : t('buttons.save')}
//                 </button>
//                 <button 
//                     onClick={handleReset} 
//                     className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 >
//                     {t('buttons.reset')}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default DisplaySettingsForm;

// update ....
// import React, { useState, useCallback } from 'react';
// import Switch from 'react-switch'; // or your preferred switch library
// import { useTranslation } from 'react-i18next'; // For localization support

// const DisplaySettingsForm = ({ settings, onSave }) => {
//     const { t } = useTranslation();
//     const [localSettings, setLocalSettings] = useState(settings);
//     const [loading, setLoading] = useState(false);

//     // Handle switch change
//     const handleChange = useCallback((section, field) => (checked) => {
//         setLocalSettings((prevSettings) => ({
//             ...prevSettings,
//             [section]: {
//                 ...prevSettings[section],
//                 [field]: checked,
//             },
//         }));
//     }, []);

//     // Handle form reset
//     const handleReset = () => {
//         setLocalSettings(settings); // Reset to initial settings
//     };

//     // Handle save settings
//     const handleSave = async () => {
//         setLoading(true);
//         try {
//             // Optional validation logic
//             if (validateSettings(localSettings)) {
//                 await fetch('/api/save-settings', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(localSettings),
//                 });
//                 console.log('Settings saved successfully:', localSettings);
//             } else {
//                 console.log('Validation failed');
//             }
//         } catch (error) {
//             console.error('Error saving settings:', error);
//             alert('Failed to save settings');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Optional validation function
//     const validateSettings = (settings) => {
//         // Add validation logic as needed
//         return true;
//     };

//     return (
//         <div>
//             {Object.keys(localSettings).map((section) => (
//                 <div key={section}>
//                     <h3>{t(`settings.${section}`)}</h3>
//                     {Object.keys(localSettings[section]).map((field) => (
//                         <div key={field} style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
//                             <label htmlFor={field} style={{ flex: 1 }}>
//                                 {t(`settings.fields.${field}`)}:
//                             </label>
//                             <Switch
//                                 id={field}
//                                 checked={localSettings[section][field]}
//                                 onChange={handleChange(section, field)}
//                                 offColor="#888"
//                                 onColor="#0d6efd"
//                                 style={{ marginLeft: '10px' }}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             ))}
//             <button onClick={handleSave} disabled={loading}>
//                 {loading ? t('buttons.saving') : t('buttons.save')}
//             </button>
//             <button onClick={handleReset} style={{ marginLeft: '10px' }}>
//                 {t('buttons.reset')}
//             </button>
//         </div>
//     );
// };

// export default DisplaySettingsForm;

// update....
// import React, { useState } from 'react';
// import Switch from 'react-switch'; // or your preferred switch library

// const DisplaySettingsForm = ({ settings, onSave }) => {
//     const [localSettings, setLocalSettings] = useState(settings);

//     const handleChange = (section, field) => (checked) => {
//         setLocalSettings({
//             ...localSettings,
//             [section]: {
//                 ...localSettings[section],
//                 [field]: checked,
//             },
//         });
//     };

//     const handleSave = () => {
//         onSave(localSettings);
//     };

//     return (
//         <div>
//             {Object.keys(localSettings).map((section) => (
//                 <div key={section}>
//                     <h3>{section}</h3>
//                     {Object.keys(localSettings[section]).map((field) => (
//                         <div key={field} style={{ margin: '10px 0' }}>
//                             <label>
//                                 {field.replace(/([A-Z])/g, ' $1').toUpperCase()}:
//                                 <Switch
//                                     checked={localSettings[section][field]}
//                                     onChange={handleChange(section, field)}
//                                 />
//                             </label>
//                         </div>
//                     ))}
//                 </div>
//             ))}
//             <button onClick={handleSave}>Save Settings</button>
//         </div>
//     );
// };

// export default DisplaySettingsForm;
