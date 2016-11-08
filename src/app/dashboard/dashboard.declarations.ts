import { DashboardComponent } from './dashboard.component';
import { DashboardFrameComponent } from './dashboard-frame/dashboard-frame.component';
import { DashboardEditorComponent } from './dashboard-editor/dashboard-editor.component';
import { SensorWidgetComponent } from './sensor-widget/sensor-widget.component';
import { SensorExecutorWidgetComponent } from './sensor-executor-widget/sensor-executor-widget.component';
import { SensorServoWidgetComponent } from './sensor-servo-widget/sensor-servo-widget.component';
import { SensorStatusWidgetComponent } from './sensor-status-widget/sensor-status-widget.component';
import { GaugeComponent } from './shared/gauge/gauge.component';

export default [
    DashboardFrameComponent,
    DashboardComponent,
    DashboardEditorComponent,
    SensorWidgetComponent,
    SensorExecutorWidgetComponent,
    SensorServoWidgetComponent,
    SensorStatusWidgetComponent,
    GaugeComponent
];
