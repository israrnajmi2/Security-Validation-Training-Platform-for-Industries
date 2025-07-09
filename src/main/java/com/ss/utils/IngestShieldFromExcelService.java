package com.ss.utils;

import com.ss.common.ExecException;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.ShieldElementToShieldElementMap;
import com.ss.domain.shieldclassification.ShieldElementType;
import com.ss.pojo.helper.IngestExceptionsInfo;
import com.ss.pojo.helper.ShieldElementIngestObj;
import com.ss.pojo.restservice.CreateShieldRequest;
import com.ss.pojo.restservice.GenericItem;
import com.ss.pojo.restservice.MappingExceptionsInfo;
import com.ss.repository.shieldclassification.ShieldElementRepository;
import com.ss.repository.shieldclassification.ShieldElementToShieldElementMapRepository;
import com.ss.service.fullhierarchytraversal.helper.ShieldFullHelper;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service("IngestShieldFromExcel")
public class IngestShieldFromExcelService {

    @Autowired
    private ShieldCreationHelperUtil shieldCreationHelperUtil;

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    @Autowired
    private ShieldElementToShieldElementMapRepository shieldElementToShieldElementMapRepository;

    @Autowired
    private ShieldFullHelper shieldFullHelper;

    /*public void ingestTestShield() throws IOException, InvalidFormatException {

        String SAMPLE_XLSX_FILE_PATH = "/home/ubuntu/toIngest.xlsx";

        // Creating a Workbook from an Excel file (.xls or .xlsx)
        Workbook workbook = WorkbookFactory.create(new File(SAMPLE_XLSX_FILE_PATH));

        // Retrieving the number of sheets in the Workbook
        System.out.println("Workbook has " + workbook.getNumberOfSheets() + " Sheets : ");
        int numberOfSheets = workbook.getNumberOfSheets();

        if (numberOfSheets == 0)
            throw new ExecException("There must be atleast one sheet; found zero sheets in the excel file");


        // Getting the Sheet at index zero
        Sheet sheet = workbook.getSheetAt(0);

        //or Sheet sheet = workbook.getSheet("INGEST");
        if (sheet == null)
            throw new ExecException("Sheet not found with index 0");

        // Create a DataFormatter to format and get each cell's value as String
        DataFormatter dataFormatter = new DataFormatter();

        // 1. You can obtain a rowIterator and columnIterator and iterate over them
        System.out.println("\n\nIterating over Rows and Columns using Iterator\n");
        Iterator<Row> rowIterator = sheet.rowIterator();
        Map<Integer, ShieldElementIngestObj> shieldTreeMap = new HashMap<>();
        List<ShieldElementIngestObj> exceptionIngests = new ArrayList<>();
        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();

            int cellCount = row.getPhysicalNumberOfCells();
            if (cellCount < 3) {
                System.out.print("Ignoring Row:  ");
                Iterator<Cell> cellIterator = row.cellIterator();

                while (cellIterator.hasNext()) {
                    Cell cell = cellIterator.next();
                    String cellValue = dataFormatter.formatCellValue(cell);
                    System.out.print(cellValue + "\t");
                }
                System.out.println();
                continue;
            }
            String refId = dataFormatter.formatCellValue(row.getCell(0)).trim();
            String name = dataFormatter.formatCellValue(row.getCell(1)).trim();
            String description = dataFormatter.formatCellValue(row.getCell(2)).trim();

            if (isValidCombination(refId, name, description)) {
                putInToShieldTreeMap(refId, name, description, shieldTreeMap, exceptionIngests);
            }
        }
        // Closing the workbook
        workbook.close();

        Collections.sort(exceptionIngests, new Comparator<ShieldElementIngestObj>() {
            @Override
            public int compare(ShieldElementIngestObj o1, ShieldElementIngestObj o2) {
                List<Integer> refIdSplitsO1 = getIndentationIdSplits(o1.getReferenceId());
                List<Integer> refIdSplitsO2 = getIndentationIdSplits(o2.getReferenceId());
                int o1Size = refIdSplitsO1.size();
                int o2Size = refIdSplitsO2.size();
                if (o1Size == o2Size) {
                    for (int i = 0; i < o1Size; i++) {
                        int o1Value = refIdSplitsO1.get(i);
                        int o2Value = refIdSplitsO2.get(i);
                        if (o1Value == o2Value)
                            continue;
                        else if (o1Value < o2Value)
                            return -1;
                        else
                            return 1;
                    }
                    return 0;
                } else if (o1Size < o2Size) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });

        handleExceptions(shieldTreeMap, exceptionIngests);

        String shieldName = "CSC";
        boolean isStandard = false;

        CreateShieldRequest createShieldRequest = new CreateShieldRequest();
        createShieldRequest.setName(shieldName);
        createShieldRequest.setAuthor("NA");
        createShieldRequest.setDescription("NA");
        createShieldRequest.setVersion("NA");
        Shield shield = shieldCreationHelperUtil.createShield(createShieldRequest, false);

        createShieldElements(shieldTreeMap, shield, null);

    }*/

    private static void printCellValue(Cell cell) {
        switch (cell.getCellTypeEnum()) {
            case BOOLEAN:
                System.out.print(cell.getBooleanCellValue());
                break;
            case STRING:
                System.out.print(cell.getRichStringCellValue().getString());
                break;
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    System.out.print(cell.getDateCellValue());
                } else {
                    System.out.print(cell.getNumericCellValue());
                }
                break;
            case FORMULA:
                System.out.print(cell.getCellFormula());
                break;
            case BLANK:
                System.out.print("");
                break;
            default:
                System.out.print("");
        }

        System.out.print("\t");
    }

    private void createShieldElements(Map<Integer, ShieldElementIngestObj> shieldTreeMap, Shield shield, ShieldElement parentShieldElement) {
        for (Map.Entry<Integer, ShieldElementIngestObj> mapEntry : shieldTreeMap.entrySet()) {
            ShieldElementIngestObj ingestObj = mapEntry.getValue();
            ShieldElement shieldElement = shieldCreationHelperUtil.createShieldElement(ingestObj.getName(), ingestObj.getDescription(), ingestObj.getReferenceId(), parentShieldElement, null, shield);
            createShieldElements(ingestObj.getShieldTreeMap(), shield, shieldElement);
        }
    }

    private boolean isValidCombination(String indentationId, String refId, String name, String description) {
        if (indentationId != null) {
            Pattern pattern = Pattern.compile("^[0-9.]*[0-9]$");
            Matcher matcher = pattern.matcher(indentationId);
            if (matcher.matches()) {
                if (refId != null && !refId.trim().equals("") && name != null && !name.equals("") && description != null)
                    return true;
            }
        }
        return false;
    }

    private void handleExceptions(Map<Integer, ShieldElementIngestObj> shieldTreeMap, List<ShieldElementIngestObj> exceptionIngests) {

        Iterator<ShieldElementIngestObj> iterator = exceptionIngests.iterator();
        while (iterator.hasNext()) {
            if (isExceptionPutInToShieldTreeMap(iterator.next(), shieldTreeMap)) {
                iterator.remove();
            }
        }
    }

    private boolean isExceptionPutInToShieldTreeMap(ShieldElementIngestObj obj, Map<Integer, ShieldElementIngestObj> shieldTreeMap) {

        List<Integer> indentationIdSplits = getIndentationIdSplits(obj.getIndentationId());

        String name = obj.getName();
        String description = obj.getDescription();
        String referenceId = obj.getReferenceId();
        int len = indentationIdSplits.size();

        for (int i = 0; i < len; i++) {
            ShieldElementIngestObj shieldElementIngestObj = shieldTreeMap.get(indentationIdSplits.get(i));
            if (i == (len - 1)) {
                if (shieldElementIngestObj == null) {
                    shieldElementIngestObj = new ShieldElementIngestObj();
                    shieldElementIngestObj.setDescription(description);
                    shieldElementIngestObj.setName(name);
                    shieldElementIngestObj.setIndentationId(getIndentationIdFromSplits(indentationIdSplits));
                    shieldElementIngestObj.setReferenceId(referenceId);
                    shieldTreeMap.put(indentationIdSplits.get(i), shieldElementIngestObj);
                } else {
                    shieldElementIngestObj.setDescription(description);
                    shieldElementIngestObj.setName(name);
                    shieldElementIngestObj.setIndentationId(getIndentationIdFromSplits(indentationIdSplits));
                    shieldElementIngestObj.setReferenceId(referenceId);
                }
            } else {
                if (shieldElementIngestObj != null) {
                    shieldTreeMap = shieldElementIngestObj.getShieldTreeMap();

                } else {
                    return false;
                }
            }
        }
        return true;
    }

    private void putInToShieldTreeMap(String indentationId, String refId, String name, String description, Map<Integer, ShieldElementIngestObj> shieldTreeMap, List<ShieldElementIngestObj> exceptionIngests) {

        List<Integer> indentationIdSplits = getIndentationIdSplits(indentationId);

        int len = indentationIdSplits.size();

        for (int i = 0; i < len; i++) {
            ShieldElementIngestObj shieldElementIngestObj = shieldTreeMap.get(indentationIdSplits.get(i));
            if (i == (len - 1)) {
                if (shieldElementIngestObj == null) {
                    shieldElementIngestObj = new ShieldElementIngestObj();
                    shieldElementIngestObj.setDescription(description);
                    shieldElementIngestObj.setName(name);
                    shieldElementIngestObj.setIndentationId(getIndentationIdFromSplits(indentationIdSplits));
                    shieldElementIngestObj.setReferenceId(refId);
                    shieldTreeMap.put(indentationIdSplits.get(i), shieldElementIngestObj);
                } else {
                    shieldElementIngestObj.setDescription(description);
                    shieldElementIngestObj.setName(name);
                    shieldElementIngestObj.setIndentationId(getIndentationIdFromSplits(indentationIdSplits));
                    shieldElementIngestObj.setReferenceId(refId);
                }
            } else {
                if (shieldElementIngestObj != null) {
                    shieldTreeMap = shieldElementIngestObj.getShieldTreeMap();

                } else {
                    shieldElementIngestObj = new ShieldElementIngestObj();
                    shieldElementIngestObj.setDescription(description);
                    shieldElementIngestObj.setName(name);
                    shieldElementIngestObj.setIndentationId(getIndentationIdFromSplits(indentationIdSplits));
                    shieldElementIngestObj.setReferenceId(refId);
                    exceptionIngests.add(shieldElementIngestObj);
                    return;
                }
            }
        }
    }

    private String getIndentationIdFromSplits(List<Integer> indentationIdSplits) {
        String indentationId = "";
        for (int i = 0; i < indentationIdSplits.size(); i++) {
            if (i == 0)
                indentationId = "" + indentationIdSplits.get(i);
            else
                indentationId = indentationId + "." + indentationIdSplits.get(i);
        }
        return indentationId;
    }

    private List<Integer> getIndentationIdSplits(String indentationId) {
        String[] splits = indentationId.split("\\.");
        List<Integer> integerSplits = getIntegerSplits(splits);
        List<Integer> response = new ArrayList<>();

        for (int i = 0; i < splits.length; i++) {
            try {
                Integer refIdSplit = Integer.parseInt(splits[i]);
                response.add(refIdSplit);
                if (isLastSplit(i, integerSplits)) {
                    return response;
                }

            } catch (NumberFormatException ne) {
                throw new ExecException("RefId must only have numbers; Malformed referenceId " + indentationId);
            }
        }
        return response;
    }

    private boolean isLastSplit(int i, List<Integer> integerSplits) {
        boolean allZero = true;
        for (int j = integerSplits.size() - 1; j > i; j--) {
            if (integerSplits.get(j) != 0) {
                allZero = false;
                break;
            }
        }
        return allZero;
    }

    private List<Integer> getIntegerSplits(String[] splits) {
        List<Integer> integerSplits = new ArrayList<>();

        for (String split : splits) {
            try {
                integerSplits.add(Integer.parseInt(split));
            } catch (NumberFormatException ne) {
                throw new ExecException("");
            }
        }
        return integerSplits;
    }

    private String getRowAsLogString(Row row, DataFormatter dataFormatter) {
        Iterator<Cell> cellIterator = row.cellIterator();
        String response = "";
        int colno = 0;
        while (cellIterator.hasNext()) {
            colno++;
            if (colno > 3)
                break;
            Cell cell = cellIterator.next();
            String cellValue = dataFormatter.formatCellValue(cell);
            response += "ColNo " + colno + ": \"" + cellValue + "\"\t";
        }
        return response;
    }

    private String getRowAsTwoColumnLogString(Row row, DataFormatter dataFormatter) {
        Iterator<Cell> cellIterator = row.cellIterator();
        String response = "";
        int colno = 0;
        while (cellIterator.hasNext()) {
            colno++;
            if (colno > 2)
                break;
            Cell cell = cellIterator.next();
            String cellValue = dataFormatter.formatCellValue(cell);
            response += "ColNo " + colno + ": \"" + cellValue + "\"\t";
        }
        return response;
    }

    public IngestExceptionsInfo ingestShield(String shieldTypeParam, MultipartFile file, String shieldName, String shieldDescription, String author, String version, String acronym) {
        if (!file.isEmpty()) {
            try {
                //byte[] bytes = file.getBytes();
                Workbook workbook = WorkbookFactory.create(file.getInputStream());

                // Retrieving the number of sheets in the Workbook
                System.out.println("Workbook has " + workbook.getNumberOfSheets() + " Sheets : ");
                int numberOfSheets = workbook.getNumberOfSheets();

                if (numberOfSheets == 0)
                    throw new ExecException("There must be atleast one sheet; found zero sheets in the excel file");


                // Getting the Sheet at index zero
                Sheet sheet = workbook.getSheetAt(0);

                //or Sheet sheet = workbook.getSheet("INGEST");
                if (sheet == null)
                    throw new ExecException("Sheet not found with index 0");

                // Create a DataFormatter to format and get each cell's value as String
                DataFormatter dataFormatter = new DataFormatter();

                // 1. You can obtain a rowIterator and columnIterator and iterate over them
                System.out.println("\n\nIterating over Rows and Columns using Iterator\n");
                Iterator<Row> rowIterator = sheet.rowIterator();
                Map<Integer, ShieldElementIngestObj> shieldTreeMap = new HashMap<>();
                List<ShieldElementIngestObj> exceptionIngests = new ArrayList<>();
                List<String> lessThanThreeColumnRows = new ArrayList<>();
                List<String> invalidRows = new ArrayList<>();
                int rowno = 0;
                while (rowIterator.hasNext()) {
                    rowno++;
                    Row row = rowIterator.next();

                    int cellCount = row.getPhysicalNumberOfCells();
                    if (cellCount < 3) {
                        lessThanThreeColumnRows.add("RowNo " + rowno + "- " + getRowAsLogString(row, dataFormatter));
                        continue;
                    }
                    String indentationId = dataFormatter.formatCellValue(row.getCell(0)).trim();
                    String refId = dataFormatter.formatCellValue(row.getCell(1)).trim();
                    String name = dataFormatter.formatCellValue(row.getCell(2)).trim();
                    String description = "";
                    if (cellCount > 3)
                        description = dataFormatter.formatCellValue(row.getCell(3)).trim();

                    if (isValidCombination(indentationId, refId, name, description)) {
                        putInToShieldTreeMap(indentationId, refId, name, description, shieldTreeMap, exceptionIngests);
                    } else {
                        invalidRows.add("RowNo " + rowno + "- " + getRowAsLogString(row, dataFormatter));
                    }
                }
                // Closing the workbook
                workbook.close();

                Collections.sort(exceptionIngests, new Comparator<ShieldElementIngestObj>() {
                    @Override
                    public int compare(ShieldElementIngestObj o1, ShieldElementIngestObj o2) {
                        List<Integer> indentationIdSplits01 = getIndentationIdSplits(o1.getIndentationId());
                        List<Integer> indentationIdSplitsO2 = getIndentationIdSplits(o2.getIndentationId());
                        int o1Size = indentationIdSplits01.size();
                        int o2Size = indentationIdSplitsO2.size();
                        if (o1Size == o2Size) {
                            for (int i = 0; i < o1Size; i++) {
                                int o1Value = indentationIdSplits01.get(i);
                                int o2Value = indentationIdSplitsO2.get(i);
                                if (o1Value == o2Value)
                                    continue;
                                else if (o1Value < o2Value)
                                    return -1;
                                else
                                    return 1;
                            }
                            return 0;
                        } else if (o1Size < o2Size) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }
                });

                handleExceptions(shieldTreeMap, exceptionIngests);

                //String shieldName = "CSC";
                //boolean isStandard = false;

                CreateShieldRequest createShieldRequest = new CreateShieldRequest();
                createShieldRequest.setName(shieldName);
                createShieldRequest.setAuthor(author);
                createShieldRequest.setDescription(shieldDescription);
                createShieldRequest.setVersion(version);
                createShieldRequest.setAcronym(acronym);
                Shield shield = shieldCreationHelperUtil.createShield(createShieldRequest, shieldTypeParam);

                // creating 10 levels by default.
                ShieldElementType parentShieldElementType = null;
                for(int i=1;i<=10;i++) {
                    parentShieldElementType = shieldCreationHelperUtil.createShieldElementType("Level " + i, "", parentShieldElementType, true, shield);
                }

                createShieldElements(shieldTreeMap, shield, null);
                IngestExceptionsInfo response = new IngestExceptionsInfo();
                response.setInValidContentRows(invalidRows);
                response.setLessThanThreeColumnRows(lessThanThreeColumnRows);
                response.setOrphanedRows(getOrphanedRowsAsStringList(exceptionIngests));
                return response;

            } catch (Exception e) {
                throw new ExecException("You failed to upload " + file.getOriginalFilename() + " => " + e.getMessage());
            }
        } else {
            throw new ExecException("Failed to upload " + file.getOriginalFilename() + " because the file was empty.");
        }
    }

    private List<String> getOrphanedRowsAsStringList(List<ShieldElementIngestObj> exceptionIngests) {
        List<String> response = new ArrayList<>();
        if (exceptionIngests != null) {
            for (ShieldElementIngestObj obj : exceptionIngests) {
                String orphanedRow = "ColNo 1: \"" + obj.getReferenceId() + "\"\tColNo 2: \"" + obj.getName() + "\"\tCol 3: \"" + obj.getDescription() + "\"";
                response.add(orphanedRow);
            }
        }
        return response;
    }

    public void populatePCI() throws IOException, InvalidFormatException {

        File file = new File("/home/chandrakanthn/Downloads/PCI/working_converted.xlsx");

        if (file.exists()) {
            //byte[] bytes = file.getBytes();
            Workbook workbook = WorkbookFactory.create(new FileInputStream(file));

            // Retrieving the number of sheets in the Workbook
            System.out.println("Workbook has " + workbook.getNumberOfSheets() + " Sheets : ");
            int numberOfSheets = workbook.getNumberOfSheets();

            if (numberOfSheets == 0)
                throw new ExecException("There must be atleast one sheet; found zero sheets in the excel file");
            List<String> result = new ArrayList<>();
            for (int k = 0; k < numberOfSheets; k++) {
                // Getting the Sheet at index zero
                Sheet sheet = workbook.getSheetAt(k);

                //or Sheet sheet = workbook.getSheet("INGEST");
                if (sheet == null)
                    throw new ExecException("Sheet not found with index 0");

                // Create a DataFormatter to format and get each cell's value as String
                DataFormatter dataFormatter = new DataFormatter();

                // 1. You can obtain a rowIterator and columnIterator and iterate over them
                System.out.println("\n\nIterating over Rows and Columns using Iterator\n");
                Iterator<Row> rowIterator = sheet.rowIterator();
                Map<Integer, ShieldElementIngestObj> shieldTreeMap = new HashMap<>();
                List<ShieldElementIngestObj> exceptionIngests = new ArrayList<>();
                List<String> lessThanThreeColumnRows = new ArrayList<>();
                List<String> invalidRows = new ArrayList<>();
                int rowno = 0;
                while (rowIterator.hasNext()) {
                    rowno++;
                    Row row = rowIterator.next();

                    int cellCount = row.getPhysicalNumberOfCells();
                    if (cellCount < 2) {
                        lessThanThreeColumnRows.add("RowNo " + rowno + "- " + getRowAsLogString(row, dataFormatter));
                        continue;
                    }
                    Iterator<Cell> cellIterator = row.cellIterator();
                    int cellIndex = 0;
                    while (cellIterator.hasNext()) {
                        cellIndex++;
                        Cell cell = cellIterator.next();
                        if (cellIndex != 1) {
                            String value = dataFormatter.formatCellValue(cell).trim();
                            if (doesValueMatchPattern(value)) {
                                result.add(value);
                                continue;
                            }
                        }
                    }
                }
            }
            // Closing the workbook
            workbook.close();

            System.out.println(result.size());

            Workbook workbook1 = new XSSFWorkbook();

            CreationHelper creationHelper = workbook1.getCreationHelper();

            Sheet sheet = workbook1.createSheet("temp");

            for (int j = 0; j < result.size(); j++) {
                String line = result.get(j);
                Row row = sheet.createRow(j);
                row.createCell(0).setCellValue(line);
            }

            sheet.autoSizeColumn(0);

            FileOutputStream fileOut = new FileOutputStream("/home/chandrakanthn/test/nested.xlsx");
            workbook1.write(fileOut);
            fileOut.close();
            workbook1.close();

        } else
            System.out.println("file does not exist");


    }

    private boolean doesValueMatchPattern(String value) {
        Pattern ptn = Pattern.compile("^A?[1-9]([0-9.]+[a-z0-9])? ");
        Matcher mtch = ptn.matcher(value);
        if (mtch.find()) {
            return true;
        }
        return false;
    }

    public MappingExceptionsInfo ingestMappings(MultipartFile file, Shield shieldOne, Shield shieldTwo) {
        if (!file.isEmpty()) {
            try {
                //byte[] bytes = file.getBytes();
                Workbook workbook = WorkbookFactory.create(file.getInputStream());

                // Retrieving the number of sheets in the Workbook
                System.out.println("Workbook has " + workbook.getNumberOfSheets() + " Sheets : ");
                int numberOfSheets = workbook.getNumberOfSheets();

                if (numberOfSheets == 0)
                    throw new ExecException("There must be atleast one sheet; found zero sheets in the excel file");


                // Getting the Sheet at index zero
                Sheet sheet = workbook.getSheetAt(0);

                //or Sheet sheet = workbook.getSheet("INGEST");
                if (sheet == null)
                    throw new ExecException("Sheet not found with index 0");

                // Create a DataFormatter to format and get each cell's value as String
                DataFormatter dataFormatter = new DataFormatter();

                // 1. You can obtain a rowIterator and columnIterator and iterate over them
                System.out.println("\n\nIterating over Rows and Columns using Iterator\n");
                Iterator<Row> rowIterator = sheet.rowIterator();
                Map<Integer, ShieldElementIngestObj> shieldTreeMap = new HashMap<>();
                List<ShieldElementIngestObj> exceptionIngests = new ArrayList<>();

                List<String> lessThanTwoColumnRows = new ArrayList<>();
                List<String> invalidMappings = new ArrayList<>();
                int rowno = 0;
                while (rowIterator.hasNext()) {
                    rowno++;
                    Row row = rowIterator.next();

                    int cellCount = row.getPhysicalNumberOfCells();
                    if (cellCount < 2) {
                        lessThanTwoColumnRows.add("RowNo " + rowno + "- " + getRowAsTwoColumnLogString(row, dataFormatter));
                        continue;
                    }
                    String refIdOne = dataFormatter.formatCellValue(row.getCell(0)).trim();
                    String refIdTwoString = dataFormatter.formatCellValue(row.getCell(1)).trim();
                    if (refIdOne.equals("") || refIdTwoString.equals(""))
                        invalidMappings.add("RowNo " + rowno + "- " + getRowAsTwoColumnLogString(row, dataFormatter));
                    ShieldElement shieldElementOne = getShieldElement(shieldElementRepository.findByAbbreviationAndShieldIdAndIsArchivedFalse(refIdOne, shieldOne.getId()));
                    if (shieldElementOne == null) {
                        invalidMappings.add("RowNo " + rowno + "- " + getRowAsTwoColumnLogString(row, dataFormatter) + "; **refId: " + refIdOne + "**");
                        continue;
                    }
                    String[] refIdTwoList = refIdTwoString.split(",");
                    for (String refIdTwo : refIdTwoList) {
                        processMapRecord(shieldTwo, dataFormatter, invalidMappings, rowno, row, shieldElementOne, refIdTwo);
                    }
                }
                // Closing the workbook
                workbook.close();

                MappingExceptionsInfo mappingExceptionsInfo = new MappingExceptionsInfo();
                mappingExceptionsInfo.setInvalidContentRows(invalidMappings);
                mappingExceptionsInfo.setLessThanTwoColumnRows(lessThanTwoColumnRows);
                return mappingExceptionsInfo;

            } catch (Exception e) {
                throw new ExecException("You failed to upload " + file.getOriginalFilename() + " => " + e.getMessage());
            }
        } else {
            throw new ExecException("Failed to upload " + file.getOriginalFilename() + " because the file was empty.");
        }
    }

    private void processMapRecord(Shield shieldTwo, DataFormatter dataFormatter, List<String> invalidMappings, int rowno, Row row, ShieldElement shieldElementOne, String refIdTwo) {
        if (refIdTwo == null || refIdTwo.equals("")) {
            invalidMappings.add("RowNo " + rowno + "- " + getRowAsTwoColumnLogString(row, dataFormatter) + "; **refId: " + refIdTwo + "**");
            return;
        }
        refIdTwo = refIdTwo.trim();

        ShieldElement shieldElementTwo = getShieldElement(shieldElementRepository.findByAbbreviationAndShieldIdAndIsArchivedFalse(refIdTwo, shieldTwo.getId()));
        if (shieldElementTwo == null) {
            invalidMappings.add("RowNo " + rowno + "- " + getRowAsTwoColumnLogString(row, dataFormatter) + "; **refId: " + refIdTwo + "**");
            return;
        }

        ShieldElementToShieldElementMap shieldElementToShieldElementMap = getShieldElementToShieldElementMap(shieldElementToShieldElementMapRepository.findByShieldElementOneIdAndShieldElementTwoId(
                shieldElementOne.getId(), shieldElementTwo.getId()));
        if (shieldElementToShieldElementMap == null) {
            shieldElementToShieldElementMap = getShieldElementToShieldElementMap(shieldElementToShieldElementMapRepository.findByShieldElementOneIdAndShieldElementTwoId(
                    shieldElementTwo.getId(), shieldElementOne.getId()));
            if (shieldElementToShieldElementMap == null) {
                shieldElementToShieldElementMap = new ShieldElementToShieldElementMap();
                shieldElementToShieldElementMap.setArchived(false);
                shieldElementToShieldElementMap.setDefault(false);
                shieldElementToShieldElementMap.setShieldElementOne(shieldElementOne);
                shieldElementToShieldElementMap.setShieldElementTwo(shieldElementTwo);

                shieldElementToShieldElementMap = shieldElementToShieldElementMapRepository.save(shieldElementToShieldElementMap);
                if (shieldElementToShieldElementMap == null) {
                    throw new ExecException("ShieldElementToShieldElementMap save to database failed");
                }
            } else {
                if (shieldElementToShieldElementMap.isArchived()) {
                    shieldElementToShieldElementMap.setArchived(false);
                    shieldElementToShieldElementMap = shieldElementToShieldElementMapRepository.save(shieldElementToShieldElementMap);
                    if (shieldElementToShieldElementMap == null) {
                        throw new ExecException("ShieldElementToShieldElementMap save to database failed");
                    }
                }
            }
        } else {
            if (shieldElementToShieldElementMap.isArchived()) {
                shieldElementToShieldElementMap.setArchived(false);
                shieldElementToShieldElementMap = shieldElementToShieldElementMapRepository.save(shieldElementToShieldElementMap);
                if (shieldElementToShieldElementMap == null) {
                    throw new ExecException("ShieldElementToShieldElementMap save to database failed");
                }
            }
        }
    }

    private ShieldElementToShieldElementMap getShieldElementToShieldElementMap(List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapList) {
        if (shieldElementToShieldElementMapList != null && !shieldElementToShieldElementMapList.isEmpty()) {
            return shieldElementToShieldElementMapList.get(0);
        }
        return null;
    }

    private ShieldElement getShieldElement(List<ShieldElement> shieldElementList) {
        if (shieldElementList != null && !shieldElementList.isEmpty()) {
            return shieldElementList.get(0);
        }
        return null;
    }

    public void exportShieldAsExcel(HttpServletRequest request, HttpServletResponse response, Shield shield) {

        //byte[] bytes = file.getBytes();
        Workbook workbook = new XSSFWorkbook();

        CreationHelper creationHelper = workbook.getCreationHelper();

        Sheet sheet = workbook.createSheet("framework");

        ResponseEntity<GenericItem> genericItemResponseEntity = shieldFullHelper.getShieldFullWithDescriptorWithoutMinification(shield.getId(), 0, null, null, 0);
        GenericItem genericItem = genericItemResponseEntity.getBody();

        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 14);
        //headerFont.setColor(IndexedColors.WHITE.getIndex());

        CellStyle headerCellStyle = workbook.createCellStyle();
        headerCellStyle.setFont(headerFont);
        //headerCellStyle.setFillBackgroundColor(IndexedColors.BLACK.getIndex());

        createHeader(sheet, headerCellStyle);
        createTopRows(genericItem.getChildren(), sheet);

        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);
        sheet.autoSizeColumn(3);
        try {

            // get MIME type of the file
            String mimeType = "application/octet-stream";

            // set content attributes for the response
            response.setContentType(mimeType);
            //response.setContentLength((int) workbook.get.length());

            // set headers for the response
            String headerKey = "Content-Disposition";
            String headerValue = String.format("attachment; filename=\"%s\"",
                    shield.getName() + ".xlsx");
            response.setHeader(headerKey, headerValue);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            workbook.write(byteArrayOutputStream);
            response.setHeader("Content-Length", "" + byteArrayOutputStream.size());
            byteArrayOutputStream.close();
            // get output stream of the response
            OutputStream outStream = response.getOutputStream();

            //fileOut = new FileOutputStream("/home/chandrakanthn/test/poi-generated-file.xlsx");
            workbook.write(outStream);
            outStream.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Closing the workbook
        try {
            workbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private void createHeader(Sheet sheet, CellStyle headerCellStyle) {

        Row headerRow = sheet.createRow(0);
        Cell cell = headerRow.createCell(0);
        cell.setCellValue("Indentation Id");
        cell.setCellStyle(headerCellStyle);

        cell = headerRow.createCell(1);
        cell.setCellValue("Descriptive Id");
        cell.setCellStyle(headerCellStyle);

        cell = headerRow.createCell(2);
        cell.setCellValue("Name");
        cell.setCellStyle(headerCellStyle);

        cell = headerRow.createCell(3);
        cell.setCellValue("Description");
        cell.setCellStyle(headerCellStyle);

    }

    private void createTopRows(List<GenericItem> children, Sheet sheet) {
        Integer indentationId = 1;
        Integer rowId = 1;
        if (children != null && !children.isEmpty()) {
            for (GenericItem child : children) {
                Row row = sheet.createRow(rowId);
                row.createCell(0).setCellValue(indentationId + "");
                row.createCell(1).setCellValue(child.getRefId());
                row.createCell(2).setCellValue(child.getName());
                row.createCell(3).setCellValue(child.getDescription());
                rowId++;
                rowId = createRows(child.getChildren(), sheet, rowId, indentationId + "");
                indentationId++;
            }
        }
    }

    private Integer createRows(List<GenericItem> children, Sheet sheet, Integer rowId, String parentIndentationId) {
        Integer indentationId = 1;
        if (children != null && !children.isEmpty()) {
            for (GenericItem child : children) {
                Row row = sheet.createRow(rowId);
                String childIndentationId = parentIndentationId + "." + indentationId;
                row.createCell(0).setCellValue(childIndentationId);
                row.createCell(1).setCellValue(child.getRefId());
                row.createCell(2).setCellValue(child.getName());
                row.createCell(3).setCellValue(child.getDescription());
                rowId++;
                rowId = createRows(child.getChildren(), sheet, rowId, childIndentationId);
                indentationId++;
            }
        }
        return rowId;
    }

}
