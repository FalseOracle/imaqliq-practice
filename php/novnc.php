<?php

// Require the autoloader
require_once 'vendor/autoload.php';

// Use the library namespace
use ProxmoxVE\Proxmox;

// Create your credentials array
$credentials = [
    'hostname' => 'proxy.prox.lan',  // Also can be an IP
    'username' => 'root',
    'password' => 'P@ssw0rd',
    'realm' => 'pam',
    'port' => '443'
];

// Then simply pass your credentials when creating the API client object.
$proxmox = new Proxmox($credentials);

if ($login = $proxmox->login()) {
    $host = $credentials['hostname'];
    $node = 'pve';
    $vmid = 100;

    $ticket = $login->getTicket();
    setcookie("PVEAuthCookie",$ticket, 0, "/", '.prox.lan' );
    $config = $proxmox->create("/nodes/$node/qemu/$vmid/vncproxy", [
        'websocket' => 1, // Start websocket proxy
    ]);

    $websock = $proxmox->get("/nodes/$node/qemu/$vmid/vncwebsocket", [
        'vncticket' => $config['data']['ticket'],
        'port' => $config['data']['port']
    ]);
    // print_r($login);
    $src_href = 'https://'.$host.'/?console=kvm&novnc=1&node='.$node.'&resize=1&vmid='.$vmid.'&path=api2/json/nodes/'.$node.'/qemu/'.$vmid.'/vncwebsocket/port/'.$config['data']['port'].'/vncticket/'.$config['data']['ticket'];
    echo '<iframe src="'.$src_href.'" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>';
}

?>
