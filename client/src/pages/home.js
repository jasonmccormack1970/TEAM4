import React from 'react';
import { getDate } from '../utils/utils';
import HelloWorld from '../components/helloworld';

// an example of creating an object which
// is then sent to a react component as a "prop"
const exampeData = {
    message1: 'query HelloQuery {hello}', // A Grpahql query
    otherData: getDate(), // A Function
    someMore: <div> 4 * 100 = {4 * 100}</div>, // Inline html and jsx
};

export default function home() {
    return (
        <div>
            <h4 className="text-muted text-center">HOME PAGE</h4>
            {<HelloWorld {...exampeData} />}
            <div>
                <div style={{ padding: '20px' }}>
                    <h6 className="lead font-weight-bold">Background</h6>
                    <div className="d-flex align-self-start">
                        SpaceX is a company that launches rockets into space. They have had
                        successes and failures. In order to increase the successes, they realise
                        they need a plan for each rocket launch. This plan would have a description,
                        due date, status and detail all necessary actions for a successful launch.
                        Each action would include a due date, responsible person and the level of
                        completion.
                    </div>
                </div>
                <div className="d-flex align-items-start" style={{ padding: '20px' }}>
                    <h6 className="lead font-weight-bold">Use Cases</h6>
                    <ul>
                        <li>
                            The launch manager needs to create actions required for a rocket launch.
                        </li>
                        <li>
                            The launch manager needs to create engineers who will perform actions.
                        </li>
                        <li>The launch manager needs to create a rocket launch plan.</li>
                        <li>
                            The launch manager needs to add existing actions to a rocket launch
                            plan.
                        </li>
                        <li>
                            The launch manager needs to assign engineers to an action in a plan.
                        </li>
                        <li>The engineer needs to update actions on a rocket launch plan.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
