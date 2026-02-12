export interface UsaJobsItem {
  MatchedObjectId: string;
  MatchedObjectDescriptor: {
    PositionTitle: string;
    OrganizationName: string;
    PositionLocationDisplay: string;
    PublicationStartDate: string;
    PositionURI: string;
    ApplyURI: string[];
    QualificationSummary: string;
    PositionRemuneration: {
      MinimumRange: string;
      MaximumRange: string;
      Description: string;
    }[];
    UserArea: {
      Details: {
        JobSummary: string;
      };
    };
  };
}
