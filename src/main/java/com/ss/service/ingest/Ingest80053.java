package com.ss.service.ingest;


import com.google.gson.GsonBuilder;
import com.opencsv.CSVReader;
import com.ss.common.ExecException;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldElementType;
import com.ss.domain.shieldclassification.ShieldType;
import com.ss.repository.shieldclassification.ShieldElementRepository;
import com.ss.repository.shieldclassification.ShieldElementTypeRepository;
import com.ss.repository.shieldclassification.ShieldRepository;
import com.ss.repository.shieldclassification.ShieldTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service("Ingest80053")
@Transactional
public class Ingest80053 {


    @Autowired
    private ShieldRepository standardRepository;

    @Autowired
    private ShieldElementTypeRepository standardElementTypeRepository;

    @Autowired
    private ShieldElementRepository standardElementRepository;

    @Autowired
    private ShieldTypeRepository shieldTypeRepository;


    public boolean ingest80053(String csvContent, String shieldType, String shieldName) {


        //String pathToFile = "/home/chandrakanth/Downloads/nist_800_53.csv";
        //String pathToFile = "/ebs/apps/spheric/nist_800_53.csv";
        String standardName = shieldName;
        String standardDescription = "NIST 800-53 Standard";
        String levelOneElementTypeName = "ControlFamily";
        boolean isLevelOneMappable = true;
        String levelTwoElementTypeName = "ControlCategory";
        boolean isLevelTwoMappable = true;
        String levelThreeElementTypeName = "Control";
        boolean isLevelThreeMappable = true;

        List<Shield> standardList = standardRepository.findByNameAndIsArchivedFalse(standardName);
        if (standardList != null && !standardList.isEmpty())
            throw new ExecException("Standard Name " + standardName + " Already Exist. Please consider deleting it before ingesting newly.");

        //create standard
        Shield standard = createStandard(standardName, standardDescription, shieldType);
        //create element types
        int hierarchyLevel = 1;
        ShieldElementType level1ElementType = createStandardElementType(levelOneElementTypeName, standard, hierarchyLevel, isLevelOneMappable, null);
        hierarchyLevel = 2;
        ShieldElementType level2ElementType = createStandardElementType(levelTwoElementTypeName, standard, hierarchyLevel, isLevelTwoMappable, level1ElementType);
        hierarchyLevel = 3;
        ShieldElementType level3ElementType = createStandardElementType(levelThreeElementTypeName, standard, hierarchyLevel, isLevelThreeMappable, level2ElementType);


        //read csv file to ingest
        BufferedReader bufferedReader = null;
        /*try {
            bufferedReader = new BufferedReader(new FileReader(pathToFile));
        } catch (FileNotFoundException e) {
            throw new ExecException("Local CSV File with Path " + pathToFile + " not found");
        }*/
        bufferedReader = new BufferedReader(new StringReader(csvContent));

        CSVReader reader = new CSVReader(bufferedReader, ',', '"');
        String[] record = null;
        //below while loop is to populate standardFunctionsMap object from csv file
        Map<String, FunctionObj> standardFunctionsMap = new LinkedHashMap<>();
        populateStandardFunctionsMapObject(level1ElementType, level2ElementType, level3ElementType, reader, record, standardFunctionsMap);

        if (!standardFunctionsMap.isEmpty()) {
            for (FunctionObj functionObj : standardFunctionsMap.values()) {
                ShieldElement standardFunction = functionObj.getStandardFunction();
                if (standardFunction.getId() == null) {
                    standardFunction = standardElementRepository.save(standardFunction);
                    if (standardFunction == null)
                        throw new ExecException("failed to save standard function ");
                }
                if (functionObj.getStandardCategoriesMap() != null && functionObj.getStandardCategoriesMap().values() != null)
                    for (CategoryObj categoryObj : functionObj.getStandardCategoriesMap().values()) {
                        ShieldElement categoryElement = categoryObj.getStandardCategory();
                        if (categoryElement.getId() == null) {
                            categoryElement.setParentShieldElement(standardFunction);
                            categoryElement = standardElementRepository.save(categoryElement);
                            if (categoryElement == null) {
                                throw new ExecException("failed to save category element ");
                            }
                        }
                        if (categoryObj.getStandardSubCategories() != null)
                            for (ShieldElement standardSubCategory : categoryObj.getStandardSubCategories()) {
                                if (standardSubCategory.getId() == null) {
                                    standardSubCategory.setParentShieldElement(categoryElement);
                                    standardSubCategory = standardElementRepository.save(standardSubCategory);
                                }
                            }
                    }
            }
        }

        return true;
    }

    public boolean ingestCsf(String csvContent, String shieldType, String shieldName) {


        //String pathToFile = "/home/chandrakanth/Downloads/nist_800_53.csv";
        //String pathToFile = "/ebs/apps/spheric/nist_800_53.csv";
        String standardName = shieldName;
        String standardDescription = "NIST 800-53 Standard";
        String levelOneElementTypeName = "Function";
        boolean isLevelOneMappable = true;
        String levelTwoElementTypeName = "Category";
        boolean isLevelTwoMappable = true;
        String levelThreeElementTypeName = "SubCategory";
        boolean isLevelThreeMappable = true;

        List<Shield> standardList = standardRepository.findByNameAndIsArchivedFalse(standardName);
        if (standardList != null && !standardList.isEmpty())
            throw new ExecException("Standard Name " + standardName + " Already Exist. Please consider deleting it before ingesting newly.");

        //create standard
        Shield standard = createStandard(standardName, standardDescription, shieldType);
        //create element types
        int hierarchyLevel = 1;
        ShieldElementType level1ElementType = createStandardElementType(levelOneElementTypeName, standard, hierarchyLevel, isLevelOneMappable, null);
        hierarchyLevel = 2;
        ShieldElementType level2ElementType = createStandardElementType(levelTwoElementTypeName, standard, hierarchyLevel, isLevelTwoMappable, level1ElementType);
        hierarchyLevel = 3;
        ShieldElementType level3ElementType = createStandardElementType(levelThreeElementTypeName, standard, hierarchyLevel, isLevelThreeMappable, level2ElementType);


        //read csv file to ingest
        BufferedReader bufferedReader = null;
        /*try {
            bufferedReader = new BufferedReader(new FileReader(pathToFile));
        } catch (FileNotFoundException e) {
            throw new ExecException("Local CSV File with Path " + pathToFile + " not found");
        }*/
        bufferedReader = new BufferedReader(new StringReader(csvContent));

        CSVReader reader = new CSVReader(bufferedReader, ',', '"');
        String[] record = null;
        //below while loop is to populate standardFunctionsMap object from csv file
        Map<String, FunctionObj> standardFunctionsMap = new LinkedHashMap<>();
        populateStandardFunctionsMapObject(level1ElementType, level2ElementType, level3ElementType, reader, record, standardFunctionsMap);

        if (!standardFunctionsMap.isEmpty()) {
            for (FunctionObj functionObj : standardFunctionsMap.values()) {
                ShieldElement standardFunction = functionObj.getStandardFunction();
                if (standardFunction.getId() == null) {
                    standardFunction = standardElementRepository.save(standardFunction);
                    if (standardFunction == null)
                        throw new ExecException("failed to save standard function ");
                }
                if (functionObj.getStandardCategoriesMap() != null && functionObj.getStandardCategoriesMap().values() != null)
                    for (CategoryObj categoryObj : functionObj.getStandardCategoriesMap().values()) {
                        ShieldElement categoryElement = categoryObj.getStandardCategory();
                        if (categoryElement.getId() == null) {
                            categoryElement.setParentShieldElement(standardFunction);
                            categoryElement = standardElementRepository.save(categoryElement);
                            if (categoryElement == null) {
                                throw new ExecException("failed to save category element ");
                            }
                        }
                        if (categoryObj.getStandardSubCategories() != null)
                            for (ShieldElement standardSubCategory : categoryObj.getStandardSubCategories()) {
                                if (standardSubCategory.getId() == null) {
                                    standardSubCategory.setParentShieldElement(categoryElement);
                                    standardSubCategory = standardElementRepository.save(standardSubCategory);
                                }
                            }
                    }
            }
        }

        return true;
    }

    private void populateStandardFunctionsMapObject(ShieldElementType level1ElementType, ShieldElementType level2ElementType, ShieldElementType level3ElementType, CSVReader reader, String[] record, Map<String, FunctionObj> standardFunctionsMap) {
        try {
            String prevFamilyAbbr = "", prevFamilyName = "", prevFamilyDesc = "", prevCategoryAbbr = "", prevCategoryName = "", prevCategoryDesc = "", prevControlAbbr = "", prevControlName = "", prevControlDesc = "";
            String familyAbbr, familyName, familyDesc, categoryAbbr, categoryName, categoryDesc, controlAbbr, controlName, controlDesc;
            while ((record = reader.readNext()) != null) {
                if (record.length != 12)
                    throw new ExecException("Error : record length is not equal to 12 " + new GsonBuilder().setPrettyPrinting().disableHtmlEscaping().create().toJson(record));
                familyAbbr = record[1];
                familyName = record[2];
                familyDesc = record[3];
                categoryAbbr = record[5];
                categoryName = record[6];
                categoryDesc = record[7];
                controlAbbr = record[9];
                controlName = record[10];
                controlDesc = record[11];
                if (familyName.equals("")) {
                    familyName = prevFamilyName;
                    familyAbbr = prevFamilyAbbr;
                    familyDesc = prevFamilyDesc;
                    if (categoryName.equals("")) {
                        categoryAbbr = prevCategoryAbbr;
                        categoryName = prevCategoryName;
                        categoryDesc = prevCategoryDesc;
                    }
                } else if (categoryName.equals("")) {
                    categoryAbbr = prevCategoryAbbr;
                    categoryName = prevCategoryName;
                    categoryDesc = prevCategoryDesc;
                }
                /*else if(controlName.equals(""))
                {
                    controlAbbr = prevControlAbbr;
                    controlName = prevControlName;
                    controlDesc = prevControlDesc;
                }*/

                // 1 - abbr, 2 - name 3 - desc. 5 - abbr , 6 - name , 7 - desc, 9 - id, 10 - name, 11 - desc
                processRecordAndUpdateMap(standardFunctionsMap, familyAbbr, familyName, familyDesc, categoryAbbr, categoryName, categoryDesc, controlAbbr, controlName, controlDesc, level1ElementType, level2ElementType, level3ElementType);
                prevFamilyAbbr = familyAbbr;
                prevFamilyName = familyName;
                prevFamilyDesc = familyDesc;
                prevCategoryAbbr = categoryAbbr;
                prevCategoryName = categoryName;
                prevCategoryDesc = categoryDesc;
                /*prevControlAbbr = controlAbbr;
                prevControlName = controlName;
                prevControlDesc = controlDesc;*/
            }
        } catch (IOException e) {
            throw new ExecException(e.getMessage());
        } catch (Exception e) {
            throw new ExecException("Error : record length is not equal to 12 " + new GsonBuilder().setPrettyPrinting().disableHtmlEscaping().create().toJson(record));
        }
    }

    private ShieldElementType createStandardElementType(String elementTypeName, Shield standard, int hierarchyLevel, boolean isMappable, ShieldElementType parentElementType) {
        ShieldElementType standardElementType = new ShieldElementType();
        standardElementType.setArchived(false);
        standardElementType.setDescription(elementTypeName);
        standardElementType.setLevel(hierarchyLevel);
        standardElementType.setMappableToSce(isMappable);
        standardElementType.setName(elementTypeName);
        standardElementType.setShield(standard);
        standardElementType.setDefault(true);
        standardElementType.setParentShieldElementType(parentElementType);
        standardElementType = standardElementTypeRepository.save(standardElementType);
        if (standardElementType == null)
            throw new ExecException("Save to ShieldElementType table failed");
        return standardElementType;
    }

    private Shield createStandard(String standardName, String standardDescription, String shieldTypeString) {
        List<ShieldType> standardType = shieldTypeRepository.findByNameAndIsArchivedFalse(shieldTypeString);

        if (standardType == null || standardType.isEmpty())
            throw new ExecException("Standard shield type not found");

        ShieldType shieldType = standardType.get(0);
        Shield standard;
        standard = new Shield();
        standard.setArchived(false);
        standard.setDescription(standardDescription);
        standard.setName(standardName);
        standard.setAuthor("Joint Task Force Transformation Initiative");
        standard.setDefault(true);
        standard.setVersion("Rev.4");
        standard.setShieldType(shieldType);
        standard = standardRepository.save(standard);
        if (standard == null)
            throw new ExecException("Save to table `Shield` Failed");
        return standard;
    }

    private void processRecordAndUpdateMap(Map<String, FunctionObj> standardFunctionsMap, String functionAbbr, String functionName, String functionDesc, String categoryAbbr, String categoryName, String categoryDesc, String subCategoryAbbr, String subCategoryName, String subCategoryDesc, ShieldElementType levelOneElementType, ShieldElementType levelTwoElementType, ShieldElementType levelThreeElementType) {
        /*if(functionAbbr == null || categoryAbbr == null || subCategoryAbbr == null || functionAbbr.trim().isEmpty() || categoryAbbr.trim().isEmpty() || subCategoryAbbr.trim().isEmpty() )
            throw new ExecException("Abbreviation is null/Empty");*/
        if (functionAbbr.trim().equals(""))
            return;
        FunctionObj functionObj = standardFunctionsMap.get(functionAbbr.trim());
        if (functionObj == null) {
            functionObj = new FunctionObj();
            functionObj.setStandardFunction(createStandardElement(functionAbbr, functionName, functionDesc, levelOneElementType));
            Map<String, CategoryObj> tempMap = new LinkedHashMap<>();
            if (!categoryAbbr.trim().equals("")) {
                CategoryObj categoryObj = new CategoryObj();
                ShieldElement categoryElement = createStandardElement(categoryAbbr, categoryName, categoryDesc, levelTwoElementType);
                categoryObj.setStandardCategory(categoryElement);
                List<ShieldElement> subCategoryElementList = new ArrayList<>();
                if (!subCategoryAbbr.trim().equals("")) {
                    ShieldElement subCategoryElement = createStandardElement(subCategoryAbbr, subCategoryName, subCategoryDesc, levelThreeElementType);
                    subCategoryElementList.add(subCategoryElement);
                }
                categoryObj.setStandardSubCategories(subCategoryElementList);
                tempMap.put(categoryAbbr.trim(), categoryObj);
            }
            functionObj.setStandardCategoriesMap(tempMap);
            standardFunctionsMap.put(functionAbbr.trim(), functionObj);
        } else {
            Map<String, CategoryObj> tempMap = functionObj.getStandardCategoriesMap();
            if (categoryAbbr.trim().equals(""))
                return;
            CategoryObj categoryObj = tempMap.get(categoryAbbr.trim());
            if (categoryObj == null) {
                categoryObj = new CategoryObj();
                categoryObj.setStandardCategory(createStandardElement(categoryAbbr, categoryName, categoryDesc, levelTwoElementType));
                List<ShieldElement> subCategoryElementList = new ArrayList<>();
                if (!subCategoryAbbr.trim().equals("")) {
                    ShieldElement subCategoryElement = createStandardElement(subCategoryAbbr, subCategoryName, subCategoryDesc, levelThreeElementType);
                    subCategoryElementList.add(subCategoryElement);
                }
                categoryObj.setStandardSubCategories(subCategoryElementList);
                tempMap.put(categoryAbbr.trim(), categoryObj);
            } else {
                if (!subCategoryAbbr.trim().equals("")) {
                    List<ShieldElement> subCategoriesList = categoryObj.getStandardSubCategories();
                    subCategoriesList.add(createStandardElement(subCategoryAbbr, subCategoryName, subCategoryDesc, levelThreeElementType));
                }
            }
        }
    }

    private ShieldElement createStandardElement(String abbr, String name, String desc, ShieldElementType elementType) {
        ShieldElement standardElement = new ShieldElement();
        standardElement.setAbbreviation(abbr.trim());
        standardElement.setArchived(false);
        standardElement.setDescription(desc);
        standardElement.setShieldElementType(elementType);
        standardElement.setName(name.trim());
        standardElement.setParentShieldElement(null);
        standardElement.setShield(elementType.getShield());
        standardElement.setDefault(true);
        standardElement.setLevel(elementType.getLevel());
        standardElement.setOrganizationalUnit(null);
        return standardElement;
    }

    private class FunctionObj {
        private ShieldElement standardFunction;
        private Map<String, CategoryObj> standardCategoriesMap;

        public ShieldElement getStandardFunction() {
            return standardFunction;
        }

        public void setStandardFunction(ShieldElement standardFunction) {
            this.standardFunction = standardFunction;
        }

        public Map<String, CategoryObj> getStandardCategoriesMap() {
            return standardCategoriesMap;
        }

        public void setStandardCategoriesMap(Map<String, CategoryObj> standardCategoriesMap) {
            this.standardCategoriesMap = standardCategoriesMap;
        }
    }

    private class CategoryObj {
        private ShieldElement standardCategory;
        private List<ShieldElement> standardSubCategories;

        public ShieldElement getStandardCategory() {
            return standardCategory;
        }

        public void setStandardCategory(ShieldElement standardCategory) {
            this.standardCategory = standardCategory;
        }

        public List<ShieldElement> getStandardSubCategories() {
            return standardSubCategories;
        }

        public void setStandardSubCategories(List<ShieldElement> standardSubCategories) {
            this.standardSubCategories = standardSubCategories;
        }
    }
}


