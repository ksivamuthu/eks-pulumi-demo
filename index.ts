import * as pulumi from '@pulumi/pulumi';
import * as eks from '@pulumi/eks';
import * as awsx from '@pulumi/awsx';
import * as k8s from '@pulumi/kubernetes';
import { ComponentResourceOptions } from '@pulumi/pulumi';

const name = 'smart-iot';

const vpc = new awsx.ec2.Vpc('VPC', { subnets: [{ type: 'public' }] });
const cluster = new eks.Cluster(name, {
    vpcId: vpc.id,
    subnetIds: vpc.publicSubnetIds,
    desiredCapacity: 2,
    minSize: 1,
    maxSize: 2,
    storageClasses: 'gp2',
    deployDashboard: false,
});

const resourceOptions: ComponentResourceOptions = {
    providers: { kubernetes: cluster.provider }
};

const nginxIngressChartOpts = {
    repo: 'stable',
    chart: 'nginx-ingress'
};

const nginxIngress = new k8s.helm.v2.Chart('nginx-ingress', nginxIngressChartOpts, resourceOptions);

const chartOpts = {
    repo: 'stable',
    chart: 'node-red',
    values: {
        config: {
            timezone: 'America/New_York'
        },
        ingress: {
            enabled: true,
            hosts: ['*.elb.amazonaws.com']
        }
    }
};

const nodeRed = new k8s.helm.v2.Chart('node-red', chartOpts, resourceOptions);

// Export the clusters' kubeconfig.
export const kubeconfig = cluster.kubeconfig;
export const appUrl = nginxIngress.getResourceProperty('v1/Service', 'nginx-ingress-controller', 'status')
    .apply(status => status.loadBalancer.ingress[0].hostname);
