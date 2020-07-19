import { ArwesImageResource } from 'ng-arwes/components/Image/Image.component';
import { ResponsiveStatus, ResponsiveStatusType } from 'ng-arwes/services/responsive/responsive.service';

export const getResponsiveResource = (resources: ArwesImageResource, responsive: ResponsiveStatus): string => {
  let resource = null;

  if (typeof resources === 'string') {
    resource = resources;
  } else if (resources) {
    const { status } = responsive;
    resource = status === ResponsiveStatusType.small
      ? resources.small
      : ResponsiveStatusType.medium
        ? resources.medium
        : ResponsiveStatusType.large
          ? resources.large
          : resources.xlarge;
  }

  return resource;
};
