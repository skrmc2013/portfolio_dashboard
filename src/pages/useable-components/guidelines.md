  <AddKeyword onSelectedItemsChange={handleSelectedItemsChange} placeholderData={"Enter Skills you like..."} errorMessage={"Duplicate Skills"} />
          {/* <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} /> */}
          {/* <KeywordInput onKeywordsChange={handleKeywordsChange} placeholderData={"Write Skills and press enter"} icon={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g stroke="#1a1919" stroke-linecap="round" stroke-width="2"><path fill="#ce3b3b" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" /><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.15s" values="0;0.3" /></path><path fill="none" stroke-dasharray="8" stroke-dashoffset="8" d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0" /></path></g></svg>} />
           */}
          {/* <MultiSelectDropdown options={roles} onKeywordsChange={handleDropdeonChange} /> */}
          {/* <MultiSelectComponent onSelectedItemsChange={handleSelectedItemsChange} /> */}
        </div>


        {/* fecthed Data form db */}
        <div className='grid grid-2'>
          <Label>Roles</Label>
          {/* <CustomDropdown options={roles} multiSelect={true} title={"Select Roles"} /> */}
          <MultiSelectDropDownComponent roles={roles}
            placeholderData="Select... Roles" />
          <Label>Project</Label>
          {/* <CustomDropdown options={""} multiSelect={true} title={"Select Project"} /> */}
        </div>
  <MultiSelectDropDownComponent 
            options={roles} 
            selectedItems={selectedRoles} 
            setSelectedItems={setSelectedRoles} 
            placeholder="Select Roles..." 
          />

         <MultiSelectDropDownComponent 
            options={projects.map(project => ({ label: project.name, value: project._id }))} 
            selectedItems={selectedProjects} 
            setSelectedItems={setSelectedProjects} 
            placeholder="Select Projects..." 
          />


