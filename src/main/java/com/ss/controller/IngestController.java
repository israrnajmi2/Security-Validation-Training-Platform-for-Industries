package com.ss.controller;

import com.ss.common.ExecException;
import com.ss.constants.MiscellaneousActionConstants;
import com.ss.constants.ObjectTypeConstants;
import com.ss.constants.ShieldTypeConstants;
import com.ss.domain.shieldclassification.Shield;
import com.ss.domain.shieldclassification.ShieldElementToShieldElementMap;
import com.ss.pojo.helper.IngestExceptionsInfo;
import com.ss.pojo.restservice.GenericItem;
import com.ss.pojo.restservice.MappingExceptionsInfo;
import com.ss.repository.shieldclassification.ShieldElementToShieldElementMapRepository;
import com.ss.service.ingest.Ingest80053;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.utils.GenericItemPOJOBuilder;
import com.ss.utils.GetWithIdHelper;
import com.ss.utils.IngestShieldFromExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.List;

@RestController
@Transactional
@RequestMapping(value = "/rest/ingest")
public class IngestController {

    @Autowired
    private Ingest80053 ingest80053;

    @Autowired
    private IngestShieldFromExcelService ingestShieldFromExcelService;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private GetWithIdHelper getWithIdHelper;

    @Autowired
    private ShieldElementToShieldElementMapRepository shieldElementToShieldElementMapRepository;

    /*@RequestMapping(value = "/ingest_nist_800_53", method = RequestMethod.POST)
    public ResponseEntity ingestStandardDummy(@RequestBody IngestStandardRequest ingestStandardRequest) {
        try {
            if (ingestStandardRequest == null || ingestStandardRequest.getCsvContent() == null)
                throw new ExecException("request csv content is null");
            boolean response = ingest80053.ingest80053(ingestStandardRequest.getCsvContent(), ShieldTypeConstants.STANDARD, "NIST 800-53");
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @RequestMapping(value = "/ingest_nist_800_53_temp_shield", method = RequestMethod.POST)
    public ResponseEntity ingestShieldDummy(@RequestBody IngestStandardRequest ingestStandardRequest) {
        try {
            if (ingestStandardRequest == null || ingestStandardRequest.getCsvContent() == null)
                throw new ExecException("request csv content is null");
            boolean response = ingest80053.ingest80053(ingestStandardRequest.getCsvContent(), ShieldTypeConstants.SHIELD, "TEMP SHEILD");
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @RequestMapping(value = "/ingest_nist_csf", method = RequestMethod.POST)
    public ResponseEntity ingestStandardCSFDummy(@RequestBody IngestStandardRequest ingestStandardRequest) {
        try {
            if (ingestStandardRequest == null || ingestStandardRequest.getCsvContent() == null)
                throw new ExecException("request csv content is null");
            boolean response = ingest80053.ingestCsf(ingestStandardRequest.getCsvContent(), ShieldTypeConstants.STANDARD, "NIST CSF");
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }*/

    /*@RequestMapping(value = "/ingest_shield_from_excel", method = RequestMethod.GET)
    public ResponseEntity ingestShieldFromExcelThreeColumnFormat() {
        try {
            ingestShieldFromExcelService.ingestTestShield();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        }
        return new ResponseEntity(true, HttpStatus.OK);
    }*/

    @RequestMapping(value = "/ingest_shield_from_excel", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<GenericItem> handleIngestShield(@RequestParam("file") MultipartFile file, @RequestParam("name") String name, @RequestParam("description") String description, @RequestParam("author") String author, @RequestParam("version") String version, @RequestParam("acronym") String acronym) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.SHIELD))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();
        IngestExceptionsInfo ingestExceptionsInfo = ingestShieldFromExcelService.ingestShield(ShieldTypeConstants.SHIELD, file, name, description, author, version, acronym);
        GenericItem response = new GenericItem();
        response.setName("success");
        response.setDebugInfo(ingestExceptionsInfo);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/ingest_standard_from_excel", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<GenericItem> handleStandardIngest(@RequestParam("file") MultipartFile file, @RequestParam("name") String name, @RequestParam("description") String description, @RequestParam("author") String author, @RequestParam("version") String version, @RequestParam("acronym") String acronym) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.STANDARD))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        IngestExceptionsInfo ingestExceptionsInfo = ingestShieldFromExcelService.ingestShield(ShieldTypeConstants.STANDARD, file, name, description, author, version, acronym);
        GenericItem response = new GenericItem();
        response.setName("success");
        response.setDebugInfo(ingestExceptionsInfo);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/ingest_threat_from_excel", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<GenericItem> handleThreatIngest(@RequestParam("file") MultipartFile file, @RequestParam("name") String name, @RequestParam("description") String description, @RequestParam("author") String author, @RequestParam("version") String version, @RequestParam("acronym") String acronym) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.THREAT_FRAMEWORK))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        IngestExceptionsInfo ingestExceptionsInfo = ingestShieldFromExcelService.ingestShield(ShieldTypeConstants.THREAT, file, name, description, author, version, acronym);
        GenericItem response = new GenericItem();
        response.setName("success");
        response.setDebugInfo(ingestExceptionsInfo);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/ingest_business_framework_from_excel", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<GenericItem> handleBusinessFrameworkIngest(@RequestParam("file") MultipartFile file, @RequestParam("name") String name, @RequestParam("description") String description, @RequestParam("author") String author, @RequestParam("version") String version, @RequestParam("acronym") String acronym) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.BUSINESS_FRAMEWORK))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        IngestExceptionsInfo ingestExceptionsInfo = ingestShieldFromExcelService.ingestShield(ShieldTypeConstants.BUSINESS, file, name, description, author, version, acronym);
        GenericItem response = new GenericItem();
        response.setName("success");
        response.setDebugInfo(ingestExceptionsInfo);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/ingest_direct_interframework_mappings", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<GenericItem> ingestDirectInterframeworkMappings(@RequestParam("file") MultipartFile file, @RequestParam("shieldOneId") Integer shieldOneId, @RequestParam("shieldTwoId") Integer shieldTwoId, @RequestParam("replaceExisting") Boolean replaceExisting) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.MODIFY_DIRECT_ELEMENT_MAPTO_ELEMENT_ASSOCIATION))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        Shield shieldOne = getWithIdHelper.getShield(shieldOneId);
        Shield shieldTwo = getWithIdHelper.getShield(shieldTwoId);

        if (replaceExisting) {
            List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapList = shieldElementToShieldElementMapRepository.findByShieldElementOneShieldIdAndShieldElementTwoShieldIdAndIsArchivedFalse(shieldOneId, shieldTwoId);
            archiveAll(shieldElementToShieldElementMapList);
            shieldElementToShieldElementMapList = shieldElementToShieldElementMapRepository.findByShieldElementOneShieldIdAndShieldElementTwoShieldIdAndIsArchivedFalse(shieldTwoId, shieldOneId);
            archiveAll(shieldElementToShieldElementMapList);
        }

        // do new mappings and note inconsistent ones.
        MappingExceptionsInfo mappingExceptionsInfo = ingestShieldFromExcelService.ingestMappings(file, shieldOne, shieldTwo);

        GenericItem response = new GenericItem();
        response.setName("success");
        response.setDebugInfo(mappingExceptionsInfo);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    private void archiveAll(List<ShieldElementToShieldElementMap> shieldElementToShieldElementMapList) {
        if (shieldElementToShieldElementMapList != null) {
            for (ShieldElementToShieldElementMap shieldElementToShieldElementMap : shieldElementToShieldElementMapList) {
                shieldElementToShieldElementMap.setArchived(true);
                shieldElementToShieldElementMap = shieldElementToShieldElementMapRepository.save(shieldElementToShieldElementMap);
                if (shieldElementToShieldElementMap == null)
                    throw new ExecException("ShieldElementToShieldElementMap save to database failed");
            }
        }
    }

    /*@RequestMapping(value = "/ingest_shield", method = RequestMethod.POST)
    public ResponseEntity ingestShieldDummy(@RequestBody IngestStandardRequest ingestStandardRequest) {
        try {
            if (ingestStandardRequest == null || ingestStandardRequest.getCsvContent() == null)
                throw new ExecException("request csv content is null");
            boolean response = ingest80053.ingest80053(ingestStandardRequest.getCsvContent(), ShieldTypeConstants.SHIELD, "NIST-CSF-Shield");
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }*/

    @RequestMapping(value = "/export_as_excel/{shieldId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> exportShieldAsExcel(HttpServletRequest request,
                                                           HttpServletResponse response, @PathVariable("shieldId") Integer shieldId) {

        if (!permissionCheckerService.haveMiscellaneousPermission(MiscellaneousActionConstants.DOWNLOAD_FRAMEWORKS_AS_EXCEL))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        Shield shield = getWithIdHelper.getShield(shieldId);
        if (shield == null || shield.isArchived()) {
            throw new ExecException("Shield with id : " + shieldId + " not found");
        }

        ingestShieldFromExcelService.exportShieldAsExcel(request, response, shield);
        return null;
    }
}
