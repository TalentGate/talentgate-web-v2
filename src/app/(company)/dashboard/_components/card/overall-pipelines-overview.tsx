import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OverallPipelinesOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Pipelines Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <p>Applied</p>
          <p>28</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Screening</p>
          <p>43</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Reference Check</p>
          <p>12</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Offer</p>
          <p>55</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Withdrawn</p>
          <p>8</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallPipelinesOverview;
