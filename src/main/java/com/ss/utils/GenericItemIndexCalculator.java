package com.ss.utils;


import com.ss.common.ExecException;
import com.ss.domain.asset.AssetDeliversSce;
import com.ss.domain.asset.AssetToShieldElementMap;
import com.ss.domain.asset.AssetTypeProtectedBySce;
import com.ss.domain.perspective.CustomPerspective;
import com.ss.domain.perspective.attribute.AssetDeliversSceRTAttribute;
import com.ss.domain.perspective.attribute.AssetImplementsElementRTAttribute;
import com.ss.domain.perspective.attribute.ShieldElementRTAttribute;
import com.ss.domain.perspective.rating.AssetDeliversSceRTRating;
import com.ss.domain.perspective.rating.AssetImplementsElementRTRating;
import com.ss.domain.perspective.rating.ShieldElementRTRating;
import com.ss.domain.sce.SceFulfillsShieldElement;
import com.ss.domain.sce.SecurityControlExpression;
import com.ss.domain.shieldclassification.ShieldElement;
import com.ss.pojo.PerspectiveGroupInfo;
import com.ss.pojo.restservice.GenericItem;
import com.ss.repository.perspective.CustomPerspectiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service("GenericItemIndexCalculator")
public class GenericItemIndexCalculator {

    @Autowired
    private CustomPerspectiveRepository customPerspectiveRepository;

    public void applyGroupSetChildrenAndCalculateIndexFooter(GenericItem genericItem, PerspectiveGroupInfo perspectiveGroupInfo, List<GenericItem> children) {
        if (perspectiveGroupInfo.isGroupFoundAndIncludeAllChildren()) {
            if (children.isEmpty())
                genericItem.setChildren(null);
            else
                genericItem.setChildren(children);

            if (perspectiveGroupInfo.isRated()) {
                genericItem.setIndex(calculateAggregateIndex(children));
            }
        } else {
            children = getChildrenWithGroupItemFoundTrue(children);
            if (children.isEmpty()) {
                genericItem.setChildren(null);
                genericItem.setGroupItemFound(false);
            } else {
                genericItem.setChildren(children);
                genericItem.setGroupItemFound(true);
            }
            if (perspectiveGroupInfo.isRated())
                genericItem.setIndex(calculateAggregateIndex(children));
        }
    }

    private List<GenericItem> getChildrenWithGroupItemFoundTrue(List<GenericItem> children) {
        List<GenericItem> response = new ArrayList<>();
        for (GenericItem genericItem : children) {
            if (genericItem.getGroupItemFound() != null && genericItem.getGroupItemFound())
                response.add(genericItem);
        }
        return response;
    }

    public Float calculateAggregateIndex(List<GenericItem> genericItemList) {
        Float index = null;
        float totalNonNull = 0;
        float sumOfIndices = 0;
        for (GenericItem genericItem : genericItemList) {
            if (genericItem.getRating() != null && !genericItem.getRating().equals(0f)) {
                totalNonNull++;
                sumOfIndices += genericItem.getRating();
            } else if (genericItem.getIndex() != null && !genericItem.getIndex().equals(0f)) {
                totalNonNull++;
                sumOfIndices += genericItem.getIndex();
            }
        }
        if (totalNonNull == 0)
            return null;
        index = sumOfIndices / totalNonNull;
        return index;
    }

    public Float calculateAggregateIndexProjection(List<GenericItem> genericItemList) {
        Float index = null;
        float totalNonNull = 0;
        float sumOfIndices = 0;
        for (GenericItem genericItem : genericItemList) {
            if (genericItem.getRating() != null && !genericItem.getRating().equals(0f)) {
                totalNonNull++;
                sumOfIndices += genericItem.getRating();
            } else if (genericItem.getIndex() != null && !genericItem.getIndex().equals(0f)) {
                totalNonNull++;
                sumOfIndices += genericItem.getIndex();
            }
        }
        if (totalNonNull == 0)
            return 0f;
        index = sumOfIndices / totalNonNull;
        return index;
    }

    public Float getRatingForAssetDeliversSceLink(AssetDeliversSce assetDeliversSce, List<Integer> perspectiveIds, Date date) {
        //for this particular asset ..

        Float compositeRating = null;

        for (Integer perspectiveId : perspectiveIds) {
            float perspectiveIndex = 0f;
            CustomPerspective perspective = customPerspectiveRepository.findOne(perspectiveId);
            if (perspective == null || perspective.isArchived())
                throw new ExecException("Perspective with id " + perspectiveId + " not found");

            float numerator = 0f;
            float count = 0;

            List<AssetDeliversSceRTAttribute> attributes = perspective.getAssetDeliversSceRTAttributeList();

            if (attributes != null) {
                for (AssetDeliversSceRTAttribute attribute : attributes) {
                    if (!attribute.isArchived() && attribute.isActivated() && attribute.getAssetDeliversSce() != null && !attribute.getAssetDeliversSce().isArchived()
                            && attribute.getAssetDeliversSce().getId().equals(assetDeliversSce.getId())) {

                        List<AssetDeliversSceRTRating> ratings = attribute.getAssetDeliversSceRTRatingList();
                        Float coefficient = attribute.getCoefficient();
                        if (coefficient == null)
                            coefficient = 1f;

                        AssetDeliversSceRTRating rating = getClosestAssetDeliversRating(ratings, new Date());

                        if (rating != null && rating.getRating() != null && !rating.getRating().equals(0) && coefficient != 0) {
                            numerator += (coefficient * rating.getRating());
                            count += coefficient;
                        }
                    }
                }
            }

            if (count == 0)
                perspectiveIndex = 0f;
            else {
                float rating = numerator / count;
                perspectiveIndex = rating;
            }

            if (perspectiveIndex != 0) {
                if (compositeRating == null)
                    compositeRating = perspectiveIndex / 5;
                else {
                    float zeroToOnePerspectiveIndex = perspectiveIndex / 5;
                    compositeRating = compositeRating * zeroToOnePerspectiveIndex;
                }
            }
        }
        if (compositeRating == null)
            return 0f;
        return compositeRating;
    }

    public Float getRatingForAssetImplementsElementLink(AssetToShieldElementMap assetToShieldElementMap, List<Integer> perspectiveIds, Date date) {
        //for this particular asset ..

        Float compositeRating = null;

        for (Integer perspectiveId : perspectiveIds) {
            float perspectiveIndex = 0f;
            CustomPerspective perspective = customPerspectiveRepository.findOne(perspectiveId);
            if (perspective == null || perspective.isArchived())
                throw new ExecException("Perspective with id " + perspectiveId + " not found");

            float numerator = 0f;
            float count = 0;

            List<AssetImplementsElementRTAttribute> attributes = perspective.getAssetImplementsElementRTAttributeList();

            if (attributes != null) {
                for (AssetImplementsElementRTAttribute attribute : attributes) {
                    if (!attribute.isArchived() && attribute.isActivated() && attribute.getAssetToShieldElementMap() != null && !attribute.getAssetToShieldElementMap().isArchived()
                            && attribute.getAssetToShieldElementMap().getId().equals(assetToShieldElementMap.getId())) {

                        List<AssetImplementsElementRTRating> ratings = attribute.getAssetImplementsElementRTRatingList();
                        Float coefficient = attribute.getCoefficient();
                        if (coefficient == null)
                            coefficient = 1f;

                        AssetImplementsElementRTRating rating = getClosestAssetImplementsRating(ratings, new Date());

                        if (rating != null && rating.getRating() != null && !rating.getRating().equals(0) && coefficient != 0) {
                            numerator += (coefficient * rating.getRating());
                            count += coefficient;
                        }
                    }
                }
            }

            if (count == 0)
                perspectiveIndex = 0f;
            else {
                float rating = numerator / count;
                perspectiveIndex = rating;
            }

            if (perspectiveIndex != 0) {
                if (compositeRating == null)
                    compositeRating = perspectiveIndex / 5;
                else {
                    float zeroToOnePerspectiveIndex = perspectiveIndex / 5;
                    compositeRating = compositeRating * zeroToOnePerspectiveIndex;
                }
            }
        }
        if (compositeRating == null)
            return 0f;
        return compositeRating;
    }

    public AssetDeliversSceRTRating getClosestAssetDeliversRating(List<AssetDeliversSceRTRating> ratings, Date date) {

        if (ratings == null)
            return null;

        date = new Date(date.getTime() + 1000);
        AssetDeliversSceRTRating closestRating = null;

        for (AssetDeliversSceRTRating rating : ratings) {
            //if rating is closer to date than response, then replace reponse with rating
            Date ratingCreatedDateTime = rating.getCreatedDateTime();
            if (closestRating == null) {
                if (ratingCreatedDateTime != null && ratingCreatedDateTime.before(date))
                    closestRating = rating;
            } else {
                if (ratingCreatedDateTime != null && ratingCreatedDateTime.before(date) && ratingCreatedDateTime.after(closestRating.getCreatedDateTime()))
                    closestRating = rating;

            }
        }
        return closestRating;

    }

    public AssetImplementsElementRTRating getClosestAssetImplementsRating(List<AssetImplementsElementRTRating> ratings, Date date) {
        if (ratings == null)
            return null;

        date = new Date(date.getTime() + 1000);
        AssetImplementsElementRTRating closestRating = null;

        for (AssetImplementsElementRTRating rating : ratings) {
            //if rating is closer to date than response, then replace reponse with rating
            Date ratingCreatedDateTime = rating.getCreatedDateTime();
            if (closestRating == null) {
                if (ratingCreatedDateTime != null && ratingCreatedDateTime.before(date))
                    closestRating = rating;
            } else {
                if (ratingCreatedDateTime != null && ratingCreatedDateTime.before(date) && ratingCreatedDateTime.after(closestRating.getCreatedDateTime()))
                    closestRating = rating;

            }
        }
        return closestRating;
    }

    public Float getRatingForAssetTypeCouldBeProtectedBySce(AssetTypeProtectedBySce assetTypeProtectedBySce, List<Integer> perspectiveIds, Date date) {
        return 0f;
    }

    /*public Float getRatingForAssetTypeIsProtectedBySce(AssetTypeProtectedBySce assetTypeProtectedBySce, Integer perspectiveId, Date date) {
        return 0f;
    }*/

    public Float getRatingForAssetTypeShallBeProtectedBySce(AssetTypeProtectedBySce assetTypeProtectedBySce, List<Integer> perspectiveIds, Date date) {
        return 0f;
    }

    public Float getRatingForSceFulfillsShieldElementLink(SceFulfillsShieldElement sceFulfillsShieldElement, List<Integer> perspectiveIds, Date date) {
        return 0f;
    }

    public Float getRatingForSce(SecurityControlExpression sce, List<Integer> perspectiveIds, Date date) {
        return 0f;
    }

    public Float getRatingForShieldElement(ShieldElement shieldElement, List<Integer> perspectiveIds, Date date) {
        //for this particular asset ..

        Float compositeRating = null;

        for (Integer perspectiveId : perspectiveIds) {
            float perspectiveIndex = 0f;
            CustomPerspective perspective = customPerspectiveRepository.findOne(perspectiveId);
            if (perspective == null || perspective.isArchived())
                throw new ExecException("Perspective with id " + perspectiveId + " not found");

            float numerator = 0f;
            float count = 0;

            List<ShieldElementRTAttribute> attributes = perspective.getShieldElementRTAttributeList();

            if (attributes != null) {
                for (ShieldElementRTAttribute attribute : attributes) {
                    ShieldElement tempShieldElement = attribute.getShieldElement();
                    if (!attribute.isArchived() && attribute.isActivated() && tempShieldElement != null && !tempShieldElement.isArchived()
                            && tempShieldElement.getId().equals(shieldElement.getId())) {

                        List<ShieldElementRTRating> ratings = attribute.getShieldElementRTRatingList();
                        Float coefficient = attribute.getCoefficient();
                        if (coefficient == null)
                            coefficient = 1f;

                        ShieldElementRTRating rating = getClosestShieldElementRating(ratings, new Date());

                        if (rating != null && rating.getRating() != null && !rating.getRating().equals(0) && coefficient != 0) {
                            numerator += (coefficient * rating.getRating());
                            count += coefficient;
                        }
                    }
                }
            }

            if (count == 0)
                perspectiveIndex = 0f;
            else {
                float rating = numerator / count;
                perspectiveIndex = rating;
            }

            if (perspectiveIndex != 0) {
                if (compositeRating == null)
                    compositeRating = perspectiveIndex / 5;
                else {
                    float zeroToOnePerspectiveIndex = perspectiveIndex / 5;
                    compositeRating = compositeRating * zeroToOnePerspectiveIndex;
                }
            }
        }
        if (compositeRating == null)
            return 0f;
        return compositeRating;
    }

    public ShieldElementRTRating getClosestShieldElementRating(List<ShieldElementRTRating> ratings, Date date) {
        if (ratings == null)
            return null;

        ShieldElementRTRating closestRating = null;

        for (ShieldElementRTRating rating : ratings) {
            //if rating is closer to date than response, then replace reponse with rating
            Date ratingCreatedDateTime = rating.getCreatedDateTime();
            if (closestRating == null) {
                if (ratingCreatedDateTime != null && ratingCreatedDateTime.before(date))
                    closestRating = rating;
            } else {
                if (ratingCreatedDateTime != null && ratingCreatedDateTime.before(date) && ratingCreatedDateTime.after(closestRating.getCreatedDateTime()))
                    closestRating = rating;

            }
        }
        return closestRating;
    }
}
