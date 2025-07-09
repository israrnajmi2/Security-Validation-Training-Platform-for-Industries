package com.ss.utils;


import com.ss.common.ExecException;
import com.ss.domain.artifact.Artifact;
import com.ss.domain.asset.*;
import com.ss.domain.businessasset.*;
import com.ss.domain.groups.*;
import com.ss.domain.parametertree.ContentParameterWord;
import com.ss.domain.parametertree.MethodParameterWord;
import com.ss.domain.parametertree.ObjectiveParameterWord;
import com.ss.domain.parametertree.SubjectParameterWord;
import com.ss.domain.perspective.CustomPerspective;
import com.ss.domain.perspective.attribute.*;
import com.ss.domain.sce.SceFulfillsShieldElement;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.*;
import com.ss.domain.usermanagement.OrganizationalUnit;
import com.ss.domain.usermanagement.SphericUser;
import com.ss.domain.usermanagement.UserRole;
import com.ss.repository.artifact.ArtifactRepository;
import com.ss.repository.asset.*;
import com.ss.repository.businessasset.*;
import com.ss.repository.groups.*;
import com.ss.repository.parametertree.ContentParameterWordRepository;
import com.ss.repository.parametertree.MethodParameterWordRepository;
import com.ss.repository.parametertree.ObjectiveParameterWordRepository;
import com.ss.repository.parametertree.SubjectParameterWordRepository;
import com.ss.repository.perspective.CustomPerspectiveRepository;
import com.ss.repository.perspective.attribute.*;
import com.ss.repository.sce.SceFulfillsShieldElementRepository;
import com.ss.repository.sce.SecurityControlExpressionRepository;
import com.ss.repository.shieldclassification.*;
import com.ss.repository.usermanagement.OrganizationalUnitRepository;
import com.ss.repository.usermanagement.SphericUserRepository;
import com.ss.repository.usermanagement.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("GetWithIdHelper")
public class GetWithIdHelper {

    @Autowired
    private ShieldRepository shieldRepository;

    @Autowired
    private ShieldTypeRepository shieldTypeRepository;

    @Autowired
    private ShieldElementTypeRepository shieldElementTypeRepository;

    @Autowired
    private ShieldElementRepository shieldElementRepository;

    @Autowired
    private SecurityControlExpressionRepository securityControlExpressionRepository;

    @Autowired
    private OrganizationalUnitRepository organizationalUnitRepository;

    @Autowired
    private ObjectiveParameterWordRepository objectiveParameterWordRepository;

    @Autowired
    private MethodParameterWordRepository methodParameterWordRepository;

    @Autowired
    private ContentParameterWordRepository contentParameterWordRepository;

    @Autowired
    private SubjectParameterWordRepository subjectParameterWordRepository;

    @Autowired
    private AssetTypeRepository assetTypeRepository;

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private TechnicalSupportInfoRepository technicalSupportInfoRepository;

    @Autowired
    private ProviderInfoRepository providerInfoRepository;

    @Autowired
    private TechnicalSupportContactInfoRepository technicalSupportContactInfoRepository;

    @Autowired
    private ShieldElementGroupRepository shieldElementGroupRepository;

    @Autowired
    private SceGroupRepository sceGroupRepository;

    @Autowired
    private AssetGroupRepository assetGroupRepository;

    @Autowired
    private AssetTypeGroupRepository assetTypeGroupRepository;

    @Autowired
    private ProviderGroupRepository providerGroupRepository;

    @Autowired
    private CustomPerspectiveRepository customPerspectiveRepository;

    @Autowired
    private AssetDeliversSceRTAttributeRepository assetDeliversSceRTAttributeRepository;

    @Autowired
    private ShieldElementRTAttributeRepository shieldElementRTAttributeRepository;

    @Autowired
    private AssetDeliversSceRTLibraryAttributeRepository assetDeliversSceRTLibraryAttributeRepository;

    @Autowired
    private SceFulfillsShieldElementRepository sceFulfillsShieldElementRepository;

    @Autowired
    private AssetDeliversSceRepository assetDeliversSceRepository;

    @Autowired
    private AssetTypeProtectedBySceRepository assetTypeProtectedBySceRepository;

    @Autowired
    private ShieldElementRTLibraryAttributeRepository shieldElementRTLibraryAttributeRepository;

    @Autowired
    private ArtifactRepository artifactRepository;

    @Autowired
    private AssetTypeToShieldElementMapRepository assetTypeToShieldElementMapRepository;

    @Autowired
    private AssetToShieldElementMapRepository assetToShieldElementMapRepository;

    @Autowired
    private ShieldElementToShieldElementMapRepository shieldElementToShieldElementMapRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private SphericUserRepository sphericUserRepository;

    @Autowired
    private TestProcedureRepository testProcedureRepository;

    @Autowired
    private IngestSourceRepository ingestSourceRepository;

    @Autowired
    private GuidanceRepository guidanceRepository;

    @Autowired
    private BusinessAssetRepository businessAssetRepository;

    @Autowired
    private BusinessAssetGroupRepository businessAssetGroupRepository;

    @Autowired
    private BusinessAssetTypeRepository businessAssetTypeRepository;

    @Autowired
    private BusinessAssetTypeGroupRepository businessAssetTypeGroupRepository;

    @Autowired
    private BusinessProviderRepository businessProviderRepository;

    @Autowired
    private BusinessProviderGroupRepository businessProviderGroupRepository;

    @Autowired
    private BusinessAssetToExpressionLinkRepository businessAssetToExpressionLinkRepository;

    @Autowired
    private BusinessAssetToShieldElementMapRepository businessAssetToShieldElementMapRepository;

    @Autowired
    private BusinessAssetTypeToExpressionLinkRepository businessAssetTypeToExpressionLinkRepository;

    @Autowired
    private BusinessAssetTypeToShieldElementMapRepository businessAssetTypeToShieldElementMapRepository;

    @Autowired
    private AssetImplementsElementRTAttributeRepository assetImplementsElementRTAttributeRepository;

    @Autowired
    private AssetImplementsElementRTLibraryAttributeRepository assetImplementsElementRTLibraryAttributeRepository;

    public Shield getShield(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        Shield obj = shieldRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Shield with id " + elementId + " not found");
        return obj;
    }

    public ShieldType getShieldType(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        ShieldType obj = shieldTypeRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Shield Type with id " + elementId + " not found");
        return obj;
    }

    public ShieldElementType getShieldElementType(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        if(elementId == 0)
            return null;

        ShieldElementType obj = shieldElementTypeRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Shield Element Type with id " + elementId + " not found");
        return obj;

    }

    public ShieldElement getShieldElement(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        ShieldElement obj = shieldElementRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Shield Element with id " + elementId + " not found");
        return obj;
    }

    public SecurityControlExpression getSce(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        SecurityControlExpression obj = securityControlExpressionRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Security Control Expression with id " + elementId + " not found");
        return obj;
    }

    public OrganizationalUnit getOrganizationalUnit(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        OrganizationalUnit obj = organizationalUnitRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Organizational Unit with id " + elementId + " not found");
        return obj;
    }

    public ObjectiveParameterWord getObjectiveParameter(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        ObjectiveParameterWord obj = objectiveParameterWordRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Objective Parameter with id " + elementId + " not found");
        return obj;
    }

    public MethodParameterWord getMethodParameter(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        MethodParameterWord obj = methodParameterWordRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Method Parameter with id " + elementId + " not found");
        return obj;
    }

    public ContentParameterWord getContentParameter(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        ContentParameterWord obj = contentParameterWordRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Content Parameter with id " + elementId + " not found");
        return obj;
    }

    public SubjectParameterWord getSubjectParameter(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        SubjectParameterWord obj = subjectParameterWordRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Subject Parameter with id " + elementId + " not found");
        return obj;
    }

    public AssetType getAssetType(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        AssetType obj = assetTypeRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Asset Type with id " + elementId + " not found");
        return obj;
    }

    public Asset getAsset(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        Asset obj = assetRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Asset with id " + elementId + " not found");
        return obj;
    }

    public TechnicalSupport getTechnicalSupport(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        TechnicalSupport obj = technicalSupportInfoRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Technical Support with id " + elementId + " not found");
        return obj;
    }

    public ProviderInfo getProvider(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        ProviderInfo obj = providerInfoRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Provider Info with id " + elementId + " not found");
        return obj;
    }

    public TechnicalSupportContactInfo getTechnicalSupportContactInfo(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        TechnicalSupportContactInfo obj = technicalSupportContactInfoRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Technical Support Contact Info with id " + elementId + " not found");
        return obj;
    }

    public ShieldElementGroup getShieldElementGroup(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        ShieldElementGroup obj = shieldElementGroupRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Shield Element Group with id " + elementId + " not found");
        return obj;

    }

    public SceGroup getSceGroup(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        SceGroup obj = sceGroupRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Security Control Expression Group with id " + elementId + " not found");
        return obj;
    }

    public AssetGroup getAssetGroup(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        AssetGroup obj = assetGroupRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Asset Group with id " + elementId + " not found");
        return obj;
    }

    public AssetTypeGroup getAssetTypeGroup(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        AssetTypeGroup obj = assetTypeGroupRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Asset Type Group with id " + elementId + " not found");
        return obj;
    }

    public ProviderGroup getProviderGroup(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        ProviderGroup obj = providerGroupRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Provider Group with id " + elementId + " not found");
        return obj;
    }

    public CustomPerspective getPerspective(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        CustomPerspective obj = customPerspectiveRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Custom Perspective with id " + elementId + " not found");
        return obj;
    }

    public AssetDeliversSceRTAttribute getAssetDeliversSceRTAttribute(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        AssetDeliversSceRTAttribute obj = assetDeliversSceRTAttributeRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Asset Delivers Sce RT Attribute with id " + elementId + " not found");
        return obj;
    }

    public AssetImplementsElementRTAttribute getAssetImplementsElementRTAttribute(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        AssetImplementsElementRTAttribute obj = assetImplementsElementRTAttributeRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Asset Implements Element RT Attribute with id " + elementId + " not found");
        return obj;
    }

    public ShieldElementRTAttribute getShieldElementRTAttribute(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        ShieldElementRTAttribute obj = shieldElementRTAttributeRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Shield Element RT Attribute with id " + elementId + " not found");
        return obj;
    }

    public AssetDeliversSceRTLibraryAttribute getAssetDeliversSceRTLibraryAttribute(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        AssetDeliversSceRTLibraryAttribute obj = assetDeliversSceRTLibraryAttributeRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Asset Delivers Sce RT Library Attribute with id " + elementId + " not found");
        return obj;
    }

    public AssetImplementsElementRTLibraryAttribute getAssetImplementsElementRTLibraryAttribute(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        AssetImplementsElementRTLibraryAttribute obj = assetImplementsElementRTLibraryAttributeRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Asset Implements Element RT Library Attribute with id " + elementId + " not found");
        return obj;
    }

    public SceFulfillsShieldElement getSceFulfillsShieldElement(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        SceFulfillsShieldElement obj = sceFulfillsShieldElementRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Sce Fulfills Shield Element Map with id " + elementId + " not found");
        return obj;
    }

    public AssetDeliversSce getAssetDeliverssce(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        AssetDeliversSce obj = assetDeliversSceRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Asset Delivers Sce Map with id " + elementId + " not found");
        return obj;
    }

    public AssetTypeProtectedBySce getAssetTypeProtectedBySce(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        AssetTypeProtectedBySce obj = assetTypeProtectedBySceRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Asset Type Protected By Sce Map with id " + elementId + " not found");
        return obj;
    }

    public ShieldElementRTLibraryAttribute getShieldElementLibraryAttribute(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        ShieldElementRTLibraryAttribute obj = shieldElementRTLibraryAttributeRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Shield Element RT Library Attribute with id " + elementId + " not found");
        return obj;
    }

    public Artifact getArtifact(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        Artifact obj = artifactRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Artifact with id " + elementId + " not found");
        return obj;
    }

    public AssetTypeToShieldElementMap getAssetTypeToShieldElementMap(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        AssetTypeToShieldElementMap obj = assetTypeToShieldElementMapRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("AssetTypeToShieldElementMap with id " + elementId + " not found");
        return obj;
    }

    public AssetToShieldElementMap getAssetToShieldElementMap(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        AssetToShieldElementMap obj = assetToShieldElementMapRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("AssetToShieldElementMap with id " + elementId + " not found");
        return obj;
    }

    public ShieldElementToShieldElementMap getShieldElementToShieldElementMap(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        ShieldElementToShieldElementMap obj = shieldElementToShieldElementMapRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("ShieldElementToShieldElementMap with id " + elementId + " not found");
        return obj;
    }

    public SphericUser getUser(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        SphericUser obj = sphericUserRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("SphericUser with id " + elementId + " not found");
        return obj;
    }

    public UserRole getUserRole(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");
        UserRole obj = userRoleRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("UserRole with id " + elementId + " not found");
        return obj;
    }

    public TestProcedure getTestProcedure(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");
        TestProcedure obj = testProcedureRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("TestProcedure with id " + elementId + " not found");
        return obj;
    }

    public Guidance getGuidance(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");
        Guidance obj = guidanceRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Guidance with id " + elementId + " not found");
        return obj;
    }

    public IngestSource getIngestSource(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");
        IngestSource obj = ingestSourceRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("IngestSource with id " + elementId + " not found");
        return obj;
    }

    public BusinessAssetType getBusinessAssetType(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");
        BusinessAssetType obj = businessAssetTypeRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Business Asset Type with id " + elementId + " not found");
        return obj;
    }

    public BusinessAsset getBusinessAsset(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");
        BusinessAsset obj = businessAssetRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Business Asset with id " + elementId + " not found");
        return obj;
    }

    public BusinessProvider getBusinessProvider(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");
        BusinessProvider obj = businessProviderRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Business Provider with id " + elementId + " not found");
        return obj;
    }

    public BusinessAssetTypeGroup getBusinessAssetTypeGroup(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");
        BusinessAssetTypeGroup obj = businessAssetTypeGroupRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Business Asset Type Group with id " + elementId + " not found");
        return obj;
    }

    public BusinessAssetGroup getBusinessAssetGroup(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");
        BusinessAssetGroup obj = businessAssetGroupRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Business Asset Group with id " + elementId + " not found");
        return obj;
    }

    public BusinessProviderGroup getBusinessProviderGroup(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");
        BusinessProviderGroup obj = businessProviderGroupRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("Business Provider Group with id " + elementId + " not found");
        return obj;
    }

    public BusinessAssetToExpressionLink getBusinessAssetToExpressionLink(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        BusinessAssetToExpressionLink obj = businessAssetToExpressionLinkRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("BusinessAssetToExpressionLink with id " + elementId + " not found");
        return obj;
    }

    public BusinessAssetToShieldElementMap getBusinessAssetToShieldElementMap(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        BusinessAssetToShieldElementMap obj = businessAssetToShieldElementMapRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("BusinessAssetToShieldElementMap with id " + elementId + " not found");
        return obj;
    }

    public BusinessAssetTypeToExpressionLink getBusinessAssetTypeToExpressionLink(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        BusinessAssetTypeToExpressionLink obj = businessAssetTypeToExpressionLinkRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("BusinessAssetTypeToExpressionLink with id " + elementId + " not found");
        return obj;
    }

    public BusinessAssetTypeToShieldElementMap getBusinessAssetTypeToShieldElementMap(Integer elementId) {
        if (elementId == null)
            throw new ExecException("elementId is null");

        BusinessAssetTypeToShieldElementMap obj = businessAssetTypeToShieldElementMapRepository.findOne(elementId);
        if (obj == null || obj.isArchived())
            throw new ExecException("BusinessAssetTypeToShieldElementMap with id " + elementId + " not found");
        return obj;
    }
}
