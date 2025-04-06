import HydrateCrewDetail from './HydrateCrewDetail';

interface CrewDetailPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

/**
 * 크루 상세 페이지
 */
const CrewDetailPage = async ({
  params,
  searchParams,
}: CrewDetailPageProps) => {
  const { id } = await params;

  return (
    <>
      {/* <ErrorHandlingWrapper
        fallbackComponent={ErrorFallback}
        suspenseFallback={<Spinner />}
      > */}
      <HydrateCrewDetail id={id} searchParams={searchParams} />
      {/* </ErrorHandlingWrapper> */}
    </>
  );
};

export default CrewDetailPage;
