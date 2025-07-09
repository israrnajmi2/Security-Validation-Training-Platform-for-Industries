package com.ss.controller;

import com.ss.common.ExecException;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.shieldclassification.Guidance;
import com.ss.domain.shieldclassification.IngestSource;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.domain.shieldclassification.TestProcedure;
import com.ss.pojo.restservice.*;
import com.ss.repository.shieldclassification.GuidanceRepository;
import com.ss.repository.shieldclassification.IngestSourceRepository;
import com.ss.repository.shieldclassification.ShieldElementRepository;
import com.ss.repository.shieldclassification.TestProcedureRepository;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.utils.DuplicateCheckingService;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@Transactional
@RequestMapping(value = "/rest/guidance_test_procedures")
public class GuidancesTestProceduresController {

    @Autowired
    private IngestSourceRepository ingestSourceRepository;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @Autowired
    private DuplicateCheckingService duplicateCheckingService;

    @Autowired
    private TestProcedureRepository testProcedureRepository;

    @Autowired
    private GuidanceRepository guidanceRepository;

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    /**
     * get all sources
     *
     * @return all available sources
     */
    @RequestMapping(value = "/get_sources_dv", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getUsersDv() {
        GenericItem response = new GenericItem();
        response.setElementId(0);
        response.setObjectType(ObjectTypeConstants.INGEST_SOURCE_ROOT);

        List<GenericItem> children = new ArrayList<>();
        List<IngestSource> sources = ingestSourceRepository.findAll();
        for (IngestSource ingestSource : sources) {
            if (ingestSource != null && !ingestSource.isArchived())
                children.add(genericItemPOJOBuilder.buildGenericPOJO(ingestSource));
        }

        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * get test procedures for given source id and element id
     *
     * @param elementId
     * @return test procedures
     */
    @RequestMapping(value = "/get_test_procedures/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getTestProcedures(@PathVariable("elementId") Integer elementId) {
        if (elementId == null || elementId.equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("ElementId cannot be null or 0; it is mandatory field", HttpStatus.BAD_REQUEST);

        GenericItem response = new GenericItem();
        response.setElementId(0);
        response.setObjectType(ObjectTypeConstants.TEST_PROCEDURE_ROOT);

        List<GenericItem> children = new ArrayList<>();
        List<TestProcedure> testProcedures = testProcedureRepository.findByShieldElementIdAndIsArchivedFalse(elementId);
        for (TestProcedure testProcedure : testProcedures) {
            if (testProcedure != null && !testProcedure.isArchived())
                children.add(genericItemPOJOBuilder.buildGenericPOJO(testProcedure));
        }

        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * get guidances for given source and give element
     *
     * @param elementId
     * @return list of guidances
     */
    @RequestMapping(value = "/get_guidances/{elementId}", method = RequestMethod.GET)
    public ResponseEntity<GenericItem> getGuidances(@PathVariable("elementId") Integer elementId) {
        if (elementId == null || elementId.equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("ElementId cannot be null or 0; it is mandatory field", HttpStatus.BAD_REQUEST);


        GenericItem response = new GenericItem();
        response.setElementId(0);
        response.setObjectType(ObjectTypeConstants.GUIDANCE_ROOT);

        List<GenericItem> children = new ArrayList<>();
        List<Guidance> guidances = guidanceRepository.findByShieldElementIdAndIsArchivedFalse(elementId);

        for (Guidance guidance : guidances) {
            if (guidance != null && !guidance.isArchived())
                children.add(genericItemPOJOBuilder.buildGenericPOJO(guidance));
        }

        response.setChildren(children);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * create new source
     *
     * @param request
     * @return created source
     */
    @RequestMapping(value = "/create_source", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createIngestSource(@RequestBody CreateIngestSourceRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.INGEST_SOURCE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        IngestSource source = new IngestSource();

        source.setName(request.getName().trim());

        if (duplicateCheckingService.isDuplicateIngestSource(source)) {
            return genericItemPOJOBuilder.buildGIErrorResponse("Source with Name " + request.getName() + " already exist", HttpStatus.CONFLICT);
        }

        source.setDescription(request.getDescription());
        source.setArchived(false);
        source.setOrganization(request.getOrganizationName());

        source = ingestSourceRepository.save(source);

        if (source == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("IngestSource Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(source);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * create test procedure for gien shield element and source
     *
     * @param request
     * @return created test procedure
     */
    @RequestMapping(value = "/create_test_procedure", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createTestProcedure(@RequestBody CreateTestProcedureRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.TEST_PROCEDURE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        TestProcedure testProcedure = new TestProcedure();

        testProcedure.setDescription(request.getDescription().trim());

        testProcedure.setArchived(false);

        /*if(request.getReferenceId() == null || request.getReferenceId().trim().isEmpty())
            return genericItemPOJOBuilder.buildGIErrorResponse("Reference Id cannot be null or empty", HttpStatus.BAD_REQUEST);*/

        testProcedure.setReferenceId(request.getReferenceId());

        if (request.getShieldElementId() == null || request.getShieldElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Id cannot be 0 or null", HttpStatus.BAD_REQUEST);

        ShieldElement shieldElement = shieldElementRepository.findOne(request.getShieldElementId());
        if (shieldElement == null || shieldElement.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element with Id " + request.getShieldElementId() + " not found", HttpStatus.NOT_FOUND);

        testProcedure.setShieldElement(shieldElement);

        IngestSource source = null;
        if (request.getSourceId() != null) {
            if (!request.getSourceId().equals(0)) {
                source = ingestSourceRepository.findOne(request.getSourceId());
                if (source == null || source.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Ingest Source with Id " + request.getSourceId() + " not found", HttpStatus.NOT_FOUND);
            }
        }
        testProcedure.setIngestSource(source);

        testProcedure = testProcedureRepository.save(testProcedure);

        if (testProcedure == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("IngestSource Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(testProcedure);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * create guidance
     *
     * @param request
     * @return created guidance object
     */
    @RequestMapping(value = "/create_guidance", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> createGuidance(@RequestBody CreateGuidanceRequest request) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.GUIDANCE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        Guidance guidance = new Guidance();

        guidance.setDescription(request.getDescription().trim());

        guidance.setArchived(false);

        if (request.getShieldElementId() == null || request.getShieldElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element Id cannot be 0 or null", HttpStatus.BAD_REQUEST);

        ShieldElement shieldElement = shieldElementRepository.findOne(request.getShieldElementId());
        if (shieldElement == null || shieldElement.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Shield Element with Id " + request.getShieldElementId() + " not found", HttpStatus.NOT_FOUND);
        guidance.setShieldElement(shieldElement);
        IngestSource source = null;
        if (request.getSourceId() != null) {
            if (!request.getSourceId().equals(0)) {
                source = ingestSourceRepository.findOne(request.getSourceId());
                if (source == null || source.isArchived())
                    return genericItemPOJOBuilder.buildGIErrorResponse("Ingest Source with Id " + request.getSourceId() + " not found", HttpStatus.NOT_FOUND);
            }
        }
        guidance.setIngestSource(source);

        guidance = guidanceRepository.save(guidance);

        if (guidance == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Guidance Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(guidance);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * get source info
     *
     * @param sourceId
     * @return ingest source information
     */
    @RequestMapping(value = "/get_source_info/{sourceId}", method = RequestMethod.GET)
    public IngestSourceInfo getSourceInfo(@PathVariable("sourceId") Integer sourceId) {

        if (sourceId == null || sourceId.equals(0))
            throw new ExecException("SourceId cannot be null or 0; it is mandatory field");

        IngestSource source = ingestSourceRepository.findOne(sourceId);
        if (source == null || source.isArchived())
            throw new ExecException("Source with id " + sourceId + " not found");
        IngestSourceInfo response = new IngestSourceInfo();
        response.setDescription(source.getDescription());
        response.setName(source.getName());
        response.setElementId(source.getId());
        response.setOrganizationName(source.getOrganization());
        return response;
    }

    /**
     * get test procedure info
     *
     * @param testProcedureId
     * @return test procedure information
     */
    @RequestMapping(value = "/get_test_procedure_info/{testProcedureId}", method = RequestMethod.GET)
    public TestProcedureInfo getTestProcedureInfo(@PathVariable("testProcedureId") Integer testProcedureId) {

        if (testProcedureId == null || testProcedureId.equals(0))
            throw new ExecException("testProcedureId cannot be null or 0; it is mandatory field");

        TestProcedure testProcedure = testProcedureRepository.findOne(testProcedureId);
        if (testProcedure == null || testProcedure.isArchived())
            throw new ExecException("TestProcedure with id " + testProcedureId + " not found");

        TestProcedureInfo response = new TestProcedureInfo();
        response.setDescription(testProcedure.getDescription());
        response.setElementId(testProcedure.getId());
        response.setReferenceId(testProcedure.getReferenceId());
        ShieldElement shieldElement = testProcedure.getShieldElement();
        if (shieldElement == null || shieldElement.isArchived())
            throw new ExecException("TestProcedure with id " + testProcedureId + " has link to null or archived shield element");
        response.setShieldElementId(shieldElement.getId());
        response.setShieldElementName(shieldElement.getName());
        IngestSource source = testProcedure.getIngestSource();
        if (source == null) {
            response.setSourceId(0);
            response.setSourceName("DEFAULT");
        } else {
            response.setSourceName(source.getName());
            response.setSourceId(source.getId());
        }
        return response;
    }

    /**
     * get guidance info
     *
     * @param guidanceId
     * @return guidance information
     */
    @RequestMapping(value = "/get_guidance_info/{guidanceId}", method = RequestMethod.GET)
    public GuidanceInfo getGuidanceInfo(@PathVariable("guidanceId") Integer guidanceId) {

        if (guidanceId == null || guidanceId.equals(0))
            throw new ExecException("guidanceId cannot be null or 0; it is mandatory field");

        Guidance guidance = guidanceRepository.findOne(guidanceId);
        if (guidance == null || guidance.isArchived())
            throw new ExecException("Guidance with id " + guidanceId + " not found");

        GuidanceInfo response = new GuidanceInfo();
        response.setDescription(guidance.getDescription());
        response.setElementId(guidance.getId());
        ShieldElement shieldElement = guidance.getShieldElement();
        if (shieldElement == null || shieldElement.isArchived())
            throw new ExecException("Guidance with id " + guidanceId + " has link to null or archived shield element");
        response.setShieldElementId(shieldElement.getId());
        response.setShieldElementName(shieldElement.getName());
        IngestSource source = guidance.getIngestSource();
        if (source == null) {
            response.setSourceId(0);
            response.setSourceName("DEFAULT");
        } else {
            response.setSourceName(source.getName());
            response.setSourceId(source.getId());
        }
        return response;
    }

    /**
     * edit source
     *
     * @param request
     * @return modified source object
     */
    @RequestMapping(value = "/edit_source", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editSource(@RequestBody EditIngestSourceRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.INGEST_SOURCE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        IngestSource source = ingestSourceRepository.findOne(request.getElementId());
        if (source == null || source.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Source with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        source.setName(request.getName().trim());

        if (duplicateCheckingService.isDuplicateIngestSource(source))
            return genericItemPOJOBuilder.buildGIErrorResponse("Source with name " + request.getName() + " already exist", HttpStatus.CONFLICT);

        source.setDescription(request.getDescription());
        source.setOrganization(request.getOrganizationName());

        source = ingestSourceRepository.save(source);

        if (source == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("IngestSource Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(source);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * edit test procedure
     *
     * @param request
     * @return edited test procedure
     */
    @RequestMapping(value = "/edit_test_procedure", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editTestProcedure(@RequestBody EditTestProcedureRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.TEST_PROCEDURE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        TestProcedure testProcedure = testProcedureRepository.findOne(request.getElementId());
        if (testProcedure == null || testProcedure.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("TestProcedure with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        testProcedure.setDescription(request.getDescription().trim());
        testProcedure.setReferenceId(request.getReferenceId());

        testProcedure = testProcedureRepository.save(testProcedure);

        if (testProcedure == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("TestProcedure Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(testProcedure);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * edit guidance
     *
     * @param request
     * @return edited guidance
     */
    @RequestMapping(value = "/edit_guidance", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editGuidance(@RequestBody EditGuidanceRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.GUIDANCE))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        Guidance guidance = guidanceRepository.findOne(request.getElementId());
        if (guidance == null || guidance.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Guidance with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);

        guidance.setDescription(request.getDescription().trim());

        guidance = guidanceRepository.save(guidance);

        if (guidance == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Guidance Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(guidance);
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
