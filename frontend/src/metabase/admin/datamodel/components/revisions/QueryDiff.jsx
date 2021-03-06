import React, { Component, PropTypes } from "react";

import LoadingAndErrorWrapper from "metabase/components/LoadingAndErrorWrapper.jsx";

import FilterList from "metabase/query_builder/filters/FilterList.jsx";
import AggregationWidget from "metabase/query_builder/AggregationWidget.jsx";

import Query from "metabase/lib/query";

export default class QueryDiff extends Component {
    static propTypes = {
        diff: PropTypes.object.isRequired,
        tableMetadata: PropTypes.object.isRequired
    };

    render() {
        let { diff: { before, after }, tableMetadata} = this.props;
        let defintion = after || before;

        return (
            <LoadingAndErrorWrapper loading={!tableMetadata}>
            {() =>
                <div className="my1" style={{ pointerEvents: "none" }}>
                    { defintion.aggregation &&
                        <AggregationWidget
                            aggregation={defintion.aggregation}
                            tableMetadata={tableMetadata}
                        />
                    }
                    <FilterList
                        filters={Query.getFilters(defintion)}
                        tableMetadata={tableMetadata}
                        maxDisplayValues={Infinity}
                    />
                </div>
            }
            </LoadingAndErrorWrapper>
        )
    }
}
