import { useMemo } from 'react';
import merge from 'lodash/merge';

import { MetricItem, ProposalMetrics } from 'src/api';

export const useGovernanceChartData = (
  governanceProposalsTypes?: ProposalMetrics | null,
) =>
  useMemo(() => {
    if (!governanceProposalsTypes?.metrics) {
      return null;
    }

    const findMaxData = (metrics: any) => {
      let max = 0;
      let maxData: MetricItem[] = [];
      const result = { metrics: {} };

      Object.values(metrics).forEach((value: any) => {
        if (max <= value.length) {
          maxData = value.map((valueItem: MetricItem) => ({
            timestamp: valueItem.timestamp,
            count: 0,
          }));
        }

        max = Math.max(max, value.length);
      });

      Object.keys(metrics).forEach((key: string) => {
        (result.metrics as any)[key] = maxData.map((maxDataItem) => {
          const finded = (metrics as any)[key].find(
            (item: MetricItem) => item.timestamp === maxDataItem.timestamp,
          );

          if (finded) {
            return finded;
          }

          return maxDataItem;
        });
      });

      return result;
    };

    const updatedMetrics = findMaxData(governanceProposalsTypes.metrics);

    const result: any[] = [];

    Object.keys(updatedMetrics.metrics).forEach((key) => {
      result.push(
        (updatedMetrics.metrics as any)[key].map((value: any) => ({
          timestamp: value.timestamp,
          [key]: value.count,
        })),
      );
    });

    return { metrics: merge([], ...result) };
  }, [governanceProposalsTypes]);
