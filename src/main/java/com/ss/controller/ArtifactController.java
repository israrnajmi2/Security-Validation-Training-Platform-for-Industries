package com.ss.controller;

import com.ss.common.ExecException;
import com.ss.constants.ObjectTypeConstants;
import com.ss.domain.artifact.Artifact;
import com.ss.pojo.restservice.EditArtifactRequest;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.artifact.ArtifactRepository;
import com.ss.service.artifact.ArtifactService;
import com.ss.service.permissions.PermissionCheckerService;
import com.ss.utils.GenericItemPOJOBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;

@RestController
@Transactional
@RequestMapping(value = "/rest/artifact")
public class ArtifactController {

    @Autowired
    private ArtifactService artifactService;

    @Autowired
    private GenericItemPOJOBuilder genericItemPOJOBuilder;

    @Autowired
    private ArtifactRepository artifactRepository;

    @Autowired
    private PermissionCheckerService permissionCheckerService;

    @RequestMapping(value = "/create_artifact", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<GenericItem> handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("objectType") String objectType, @RequestParam("elementId") Integer elementId, @RequestParam("name") String name, @RequestParam("description") String description) {

        if (!permissionCheckerService.hasCreatePermission(ObjectTypeConstants.ARTIFACT))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        // todo check if objectType and elementId exist...
        if (!ObjectTypeConstants.CONSTANTS_AS_ARRAY.contains(objectType))
            return genericItemPOJOBuilder.buildGIErrorResponse("Unknown ObjectType", HttpStatus.BAD_REQUEST);

        Artifact artifact = artifactService.handleFileUpload(file, objectType, elementId, name, description);
        if (artifact == null)
            throw new ExecException("Failed to create Artifact");
        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(artifact);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/download/{artifactId}", method = RequestMethod.GET)
    public void doDownload(HttpServletRequest request,
                           HttpServletResponse response, @PathVariable Integer artifactId) throws IOException {

        artifactService.doDownload(request, response, artifactId);
    }

    @RequestMapping(value = "/edit_artifact", method = RequestMethod.POST)
    public ResponseEntity<GenericItem> editArtifact(@RequestBody EditArtifactRequest request) {

        if (!permissionCheckerService.hasEditPermission(ObjectTypeConstants.ARTIFACT))
            return genericItemPOJOBuilder.buildAccessDeniedResponse();

        if (request.getElementId() == null || request.getElementId().equals(0))
            return genericItemPOJOBuilder.buildGIErrorResponse("Element Id cannot be null or 0", HttpStatus.BAD_REQUEST);

        Artifact artifact = artifactRepository.findOne(request.getElementId());
        if (artifact == null || artifact.isArchived())
            return genericItemPOJOBuilder.buildGIErrorResponse("Artifact with id " + request.getElementId() + " not found", HttpStatus.NOT_FOUND);


        artifact.setName(request.getName().trim());
        artifact.setDescription(request.getDescription());

        artifact = artifactRepository.save(artifact);

        if (artifact == null)
            return genericItemPOJOBuilder.buildGIErrorResponse("Artifact Save to Database Failed", HttpStatus.INTERNAL_SERVER_ERROR);

        GenericItem response = genericItemPOJOBuilder.buildGenericPOJO(artifact);
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
