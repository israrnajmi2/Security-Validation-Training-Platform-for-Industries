package com.ss.service.artifact;

import com.ss.common.ExecException;
import com.ss.domain.artifact.Artifact;
import com.ss.repository.artifact.ArtifactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

@Service("ArtifactService")
public class ArtifactService {

    @Autowired
    private Environment environment;

    @Autowired
    private ArtifactRepository artifactRepository;

    public Artifact handleFileUpload(MultipartFile file, String objectType, Integer elementId, String artifactName, String description) {
        String uploadLocalDirectory = null;
        try {
            uploadLocalDirectory = environment.getRequiredProperty("directory.path.to.uploaded.files");
        } catch (IllegalStateException ex) {
            System.out.println(ex.getMessage());
            uploadLocalDirectory = "/tmp";
        }
        if (uploadLocalDirectory == null)
            uploadLocalDirectory = "/tmp";

        if (uploadLocalDirectory == null)
            throw new ExecException("environment variable directory.path.to.uploaded.files not found");
        //check if directory exist
        checkIfDirectoryExist(uploadLocalDirectory);

        String name = file.getOriginalFilename();
        //check for existence of name if it already exists.. modify name appending with number at end.
        name = getUniqueFileNameInUploadDirectory(uploadLocalDirectory, name);
        String urlString = uploadLocalDirectory + "/" + name;
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(new File(urlString)));
                stream.write(bytes);
                stream.close();

                Artifact artifact = new Artifact();
                artifact.setArchived(false);
                artifact.setDescription(description);
                artifact.setElementId(elementId);
                if (artifactName == null)
                    artifact.setName(name);
                else
                    artifact.setName(artifactName);
                artifact.setObjectType(objectType);
                artifact.setOriginalFileName(name);
                artifact.setUrlString(urlString);

                artifact = artifactRepository.save(artifact);

                if (artifact == null)
                    throw new ExecException("Artifact Save to Database Failed");

                return artifact;

            } catch (Exception e) {
                throw new ExecException("You failed to upload " + name + " => " + e.getMessage());
            }
        } else {
            throw new ExecException("Failed to upload " + name + " because the file was empty.");
        }
    }

    private void checkIfDirectoryExist(String uploadLocalDirectory) {
        File obj = new File(uploadLocalDirectory);
        if (!obj.isDirectory()) {
            throw new ExecException("Upload Directory path " + uploadLocalDirectory + " does not exist");
        }
    }

    private String getUniqueFileNameInUploadDirectory(String uploadLocalDirectory, String name) {
        String path = uploadLocalDirectory + "/" + name;

        int count = 1;
        while (checkIfFileExist(path)) {
            name = name + " (" + count + ")";
            path = uploadLocalDirectory + "/" + name;
            count++;
        }
        return name;
    }

    private boolean checkIfFileExist(String path) {
        File obj = new File(path);
        if (obj.exists())
            return true;
        return false;
    }

    public void doDownload(HttpServletRequest request, HttpServletResponse response, Integer artifactId) throws IOException {
        final int BUFFER_SIZE = 4096;
        //String uploadLocalDirectory = environment.getRequiredProperty("directory.path.to.uploaded.files");

        //checkIfDirectoryExist(uploadLocalDirectory);

        Artifact artifact = artifactRepository.findOne(artifactId);
        if (artifact == null)
            throw new ExecException("Artifact with id " + artifactId + " not found");

        String src = artifact.getUrlString();
        // get absolute path of the application
        ServletContext context = request.getServletContext();

        File downloadFile = new File(src);
        if (!downloadFile.exists()) {
            throw new ExecException("Artifact file with id " + artifactId + " not found");
        }
        FileInputStream inputStream = new FileInputStream(downloadFile);

        // get MIME type of the file
        String mimeType = context.getMimeType(src);
        if (mimeType == null) {
            // set to binary type if MIME mapping not found
            mimeType = "application/octet-stream";
        }
        System.out.println("MIME type: " + mimeType);

        // set content attributes for the response
        response.setContentType(mimeType);
        response.setContentLength((int) downloadFile.length());

        // set headers for the response
        String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=\"%s\"",
                downloadFile.getName());
        response.setHeader(headerKey, headerValue);

        // get output stream of the response
        OutputStream outStream = response.getOutputStream();

        byte[] buffer = new byte[BUFFER_SIZE];
        int bytesRead = -1;

        // write bytes read from the input stream into the output stream
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outStream.write(buffer, 0, bytesRead);
        }

        inputStream.close();
        outStream.close();
    }

}
