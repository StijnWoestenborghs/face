import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const RIG_POINTS = [
    "root",
    "DEF-spine",
    "DEF-spine001",
    "DEF-spine002",
    "DEF-spine003",
    "DEF-neck",
    "DEF-head",
    "VIS_upper_arm_ik_poleL",
    "VIS_upper_arm_ik_poleR",
    "VIS_thigh_ik_poleL",
    "VIS_thigh_ik_poleR",
    "MCH-torsoparent",
    "torso",
    "hips",
    "chest",
    "MCH-spine001",
    "spine_fk001",
    "MCH-spine",
    "spine_fk",
    "tweak_spine",
    "ORG-spine",
    "ORG-thighL",
    "ORG-shinL",
    "ORG-footL",
    "ORG-toeL",
    "ORG-heel02L",
    "MCH-toeL",
    "toeL",
    "MCH-foot_tweakL",
    "foot_tweakL",
    "MCH-shin_tweakL",
    "shin_tweakL",
    "MCH-shin_tweakL001",
    "shin_tweakL001",
    "MCH-thigh_parent_widgetL",
    "MCH-thigh_tweakL001",
    "thigh_tweakL001",
    "ORG-thighR",
    "ORG-shinR",
    "ORG-footR",
    "ORG-toeR",
    "ORG-heel02R",
    "MCH-toeR",
    "toeR",
    "MCH-foot_tweakR",
    "foot_tweakR",
    "MCH-shin_tweakR",
    "shin_tweakR",
    "MCH-shin_tweakR001",
    "shin_tweakR001",
    "MCH-thigh_parent_widgetR",
    "MCH-thigh_tweakR001",
    "thigh_tweakR001",
    "thigh_parentL",
    "MCH-thigh_parentL",
    "thigh_fkL",
    "shin_fkL",
    "MCH-foot_fkL",
    "foot_fkL",
    "MCH-thigh_ik_swingL",
    "thigh_ikL",
    "MCH-shin_ikL",
    "MCH-thigh_tweakL",
    "thigh_tweakL",
    "DEF-thighL",
    "DEF-thighL001",
    "DEF-shinL",
    "DEF-shinL001",
    "DEF-footL",
    "DEF-toeL",
    "thigh_parentR",
    "MCH-thigh_parentR",
    "thigh_fkR",
    "shin_fkR",
    "MCH-foot_fkR",
    "foot_fkR",
    "MCH-thigh_ik_swingR",
    "thigh_ikR",
    "MCH-shin_ikR",
    "MCH-thigh_tweakR",
    "thigh_tweakR",
    "DEF-thighR",
    "DEF-thighR001",
    "DEF-shinR",
    "DEF-shinR001",
    "DEF-footR",
    "DEF-toeR",
    "tweak_spine001",
    "ORG-spine001",
    "MCH-WGT-hips",
    "MCH-spine002",
    "spine_fk002",
    "MCH-pivot",
    "tweak_spine002",
    "ORG-spine002",
    "MCH-spine003",
    "spine_fk003",
    "ORG-neck",
    "ORG-head",
    "ORG-eyeballR",
    "DEF-eyeballR",
    "ORG-eyeball_lookatR",
    "ORG-eyeballL",
    "DEF-eyeballL",
    "ORG-eyeball_lookatL",
    "ORG-facs_control",
    "ORG-brow_inner_up",
    "ORG-pucker_cheekPuf",
    "ORG-mouth_shrug_roll_upper",
    "ORG-mouth_lt_rt_funnel",
    "ORG-mouth_roll_lower",
    "ORG-jaw_dwn_mouth_clsd",
    "ORG-jaw_open_lt_rt_frwd",
    "ORG-brow_dwn_L",
    "ORG-eye_blink_open_L",
    "ORG-eye_squint_L",
    "ORG-brow_outer_up_L",
    "ORG-nose_sneer_L",
    "ORG-cheek_squint_L",
    "ORG-mouth_dimple_L",
    "ORG-mouth_smile_frown_L",
    "ORG-mouth_upper_up_L",
    "ORG-mouth_lower_down_L",
    "ORG-mouth_stretch_L",
    "ORG-brow_dwn_R",
    "ORG-brow_outer_up_R",
    "ORG-eye_blink_open_R",
    "ORG-eye_squint_R",
    "ORG-cheek_squint_R",
    "ORG-mouth_dimple_R",
    "ORG-mouth_lower_down_R",
    "ORG-mouth_upper_up_R",
    "ORG-mouth_smile_frown_R",
    "ORG-mouth_stretch_R",
    "ORG-nose_sneer_R",
    "ORG-tongue_out_lt_rt_up_dwn",
    "brow_dwn_L",
    "brow_dwn_R",
    "brow_inner_up",
    "brow_outer_up_L",
    "brow_outer_up_R",
    "cheek_squint_L",
    "cheek_squint_R",
    "eye_blink_open_L",
    "eye_blink_open_R",
    "eye_squint_L",
    "eye_squint_R",
    "jaw_dwn_mouth_clsd",
    "jaw_open_lt_rt_frwd",
    "mouth_dimple_L",
    "mouth_dimple_R",
    "mouth_lower_down_L",
    "mouth_lower_down_R",
    "mouth_lt_rt_funnel",
    "mouth_roll_lower",
    "mouth_shrug_roll_upper",
    "mouth_smile_frown_L",
    "mouth_smile_frown_R",
    "mouth_stretch_L",
    "mouth_stretch_R",
    "mouth_upper_up_L",
    "mouth_upper_up_R",
    "nose_sneer_L",
    "nose_sneer_R",
    "pucker_cheekPuf",
    "tongue_out_lt_rt_up_dwn",
    "DEF-facs_control",
    "ORG-eyeball_lookat_master",
    "DEF-eyeball_lookat_master",
    "ORG-jaw",
    "DEF-jaw",
    "ORG-jaw_upper",
    "DEF-jaw_upper",
    "eyeball_lookat_master",
    "facs_control",
    "MCH-ROT-neck",
    "neck",
    "MCH-ROT-head",
    "head",
    "tweak_neck",
    "MCH-STR-neck",
    "tweak_spine003",
    "ORG-spine003",
    "ORG-shoulderL",
    "ORG-upper_armL",
    "ORG-forearmL",
    "ORG-handL",
    "MCH-hand_tweakL",
    "hand_tweakL",
    "MCH-forearm_tweakL",
    "forearm_tweakL",
    "MCH-forearm_tweakL001",
    "forearm_tweakL001", 
    "MCH-upper_arm_parent_widgetL",
    "MCH-upper_arm_tweakL001",
    "upper_arm_tweakL001",
    "DEF-shoulderL",
    "upper_arm_parentL",
    "MCH-upper_arm_parentL",
    "upper_arm_fkL",
    "forearm_fkL",
    "MCH-hand_fkL",
    "hand_fkL",
    "MCH-upper_arm_ik_swingL",
    "upper_arm_ikL",
    "MCH-forearm_ikL",
    "MCH-upper_arm_tweakL",
    "upper_arm_tweakL",
    "DEF-upper_armL",
    "DEF-upper_armL001",
    "DEF-forearmL",
    "DEF-forearmL001",
    "DEF-handL",
    "ORG-palm01L",
    "ORG-f_index01L",
    "ORG-f_index02L",
    "ORG-f_index03L",
    "ORG-thumb01L",
    "ORG-thumb02L",
    "ORG-thumb03L",
    "DEF-f_index01L",
    "DEF-f_index02L",
    "DEF-f_index03L",
    "f_index01_masterL",
    "DEF-thumb01L",
    "DEF-thumb02L",
    "DEF-thumb03L",
    "thumb01_masterL",
    "DEF-palm01L",
    "MCH-f_index01_drvL",
    "f_index01L",
    "MCH-f_index02_drvL",
    "f_index02L",
    "MCH-f_index03_drvL",
    "f_index03L",
    "f_index01L001",
    "MCH-f_index03L",
    "MCH-f_index02L",
    "MCH-f_index01L",
    "MCH-thumb01_drvL",
    "thumb01L",
    "MCH-thumb02_drvL",
    "thumb02L",
    "MCH-thumb03_drvL",
    "thumb03L",
    "thumb01L001",
    "MCH-thumb03L",
    "MCH-thumb02L",
    "MCH-thumb01L",
    "ORG-palm02L",
    "ORG-f_middle01L",
    "ORG-f_middle02L",
    "ORG-f_middle03L",
    "DEF-f_middle01L",
    "DEF-f_middle02L",
    "DEF-f_middle03L",
    "f_middle01_masterL",
    "DEF-palm02L",
    "MCH-f_middle01_drvL",
    "f_middle01L",
    "MCH-f_middle02_drvL",
    "f_middle02L",
    "MCH-f_middle03_drvL",
    "f_middle03L",
    "f_middle01L001",
    "MCH-f_middle03L",
    "MCH-f_middle02L",
    "MCH-f_middle01L",
    "ORG-palm03L",
    "ORG-f_ring01L",
    "ORG-f_ring02L",
    "ORG-f_ring03L",
    "DEF-f_ring01L",
    "DEF-f_ring02L",
    "DEF-f_ring03L",
    "f_ring01_masterL",
    "DEF-palm03L",
    "MCH-f_ring01_drvL",
    "f_ring01L",
    "MCH-f_ring02_drvL",
    "f_ring02L",
    "MCH-f_ring03_drvL",
    "f_ring03L",
    "f_ring01L001",
    "MCH-f_ring03L",
    "MCH-f_ring02L",
    "MCH-f_ring01L",
    "ORG-palm04L",
    "ORG-f_pinky01L",
    "ORG-f_pinky02L",
    "ORG-f_pinky03L",
    "DEF-f_pinky01L",
    "DEF-f_pinky02L",
    "DEF-f_pinky03L",
    "f_pinky01_masterL",
    "DEF-palm04L",
    "MCH-f_pinky01_drvL",
    "f_pinky01L",
    "MCH-f_pinky02_drvL",
    "f_pinky02L",
    "MCH-f_pinky03_drvL",
    "f_pinky03L",
    "f_pinky01L001",
    "MCH-f_pinky03L",
    "MCH-f_pinky02L",
    "MCH-f_pinky01L",
    "palmL",
    "ORG-shoulderR",
    "ORG-upper_armR",
    "ORG-forearmR",
    "ORG-handR",
    "MCH-hand_tweakR",
    "hand_tweakR",
    "MCH-forearm_tweakR",
    "forearm_tweakR",
    "MCH-forearm_tweakR001",
    "forearm_tweakR001",
    "MCH-upper_arm_parent_widgetR",
    "MCH-upper_arm_tweakR001",
    "upper_arm_tweakR001",
    "DEF-shoulderR",
    "upper_arm_parentR",
    "MCH-upper_arm_parentR",
    "upper_arm_fkR",
    "forearm_fkR",
    "MCH-hand_fkR",
    "hand_fkR",
    "MCH-upper_arm_ik_swingR",
    "upper_arm_ikR",
    "MCH-forearm_ikR",
    "MCH-upper_arm_tweakR",
    "upper_arm_tweakR",
    "DEF-upper_armR",
    "DEF-upper_armR001",
    "DEF-forearmR",
    "DEF-forearmR001",
    "DEF-handR", 
    "ORG-palm01R",
    "ORG-f_index01R",
    "ORG-f_index02R",
    "ORG-f_index03R",
    "ORG-thumb01R",
    "ORG-thumb02R",
    "ORG-thumb03R",
    "DEF-f_index01R",
    "DEF-f_index02R",
    "DEF-f_index03R",
    "f_index01_masterR",
    "DEF-thumb01R",
    "DEF-thumb02R",
    "DEF-thumb03R",
    "thumb01_masterR",
    "DEF-palm01R",
    "MCH-f_index01_drvR",
    "f_index01R",
    "MCH-f_index02_drvR",
    "f_index02R",
    "MCH-f_index03_drvR",
    "f_index03R",
    "f_index01R001",
    "MCH-f_index03R",
    "MCH-f_index02R",
    "MCH-f_index01R",
    "MCH-thumb01_drvR",
    "thumb01R",
    "MCH-thumb02_drvR",
    "thumb02R",
    "MCH-thumb03_drvR",
    "thumb03R",
    "thumb01R001",
    "MCH-thumb03R",
    "MCH-thumb02R",
    "MCH-thumb01R",
    "ORG-palm02R",
    "ORG-f_middle01R",
    "ORG-f_middle02R",
    "ORG-f_middle03R",
    "DEF-f_middle01R",
    "DEF-f_middle02R",
    "DEF-f_middle03R",
    "f_middle01_masterR",
    "DEF-palm02R",
    "MCH-f_middle01_drvR",
    "f_middle01R",
    "MCH-f_middle02_drvR",
    "f_middle02R",
    "MCH-f_middle03_drvR",
    "f_middle03R",
    "f_middle01R001",
    "MCH-f_middle03R",
    "MCH-f_middle02R",
    "MCH-f_middle01R",
    "ORG-palm03R",
    "ORG-f_ring01R",
    "ORG-f_ring02R",
    "ORG-f_ring03R",
    "DEF-f_ring01R",
    "DEF-f_ring02R",
    "DEF-f_ring03R",
    "f_ring01_masterR",
    "DEF-palm03R",
    "MCH-f_ring01_drvR",
    "f_ring01R",
    "MCH-f_ring02_drvR",
    "f_ring02R",
    "MCH-f_ring03_drvR",
    "f_ring03R",
    "f_ring01R001",
    "MCH-f_ring03R",
    "MCH-f_ring02R",
    "MCH-f_ring01R",
    "ORG-palm04R",
    "ORG-f_pinky01R",
    "ORG-f_pinky02R",
    "ORG-f_pinky03R",
    "DEF-f_pinky01R",
    "DEF-f_pinky02R",
    "DEF-f_pinky03R",
    "f_pinky01_masterR",
    "DEF-palm04R",
    "MCH-f_pinky01_drvR",
    "f_pinky01R",
    "MCH-f_pinky02_drvR",
    "f_pinky02R",
    "MCH-f_pinky03_drvR",
    "f_pinky03R",
    "f_pinky01R001",
    "MCH-f_pinky03R",
    "MCH-f_pinky02R",
    "MCH-f_pinky01R",
    "palmR",
    "ORG-breastL",
    "DEF-breastL",
    "ORG-breastR",
    "DEF-breastR",
    "breastL",
    "breastR",
    "shoulderL",
    "shoulderR",
    "MCH-WGT-chest",
    "MCH-hand_ikparentL",
    "hand_ikL",
    "MCH-upper_arm_ik_targetL",
    "MCH-upper_arm_ik_targetparentL",
    "upper_arm_ik_targetL",
    "MCH-hand_ikparentR",
    "hand_ikR",
    "MCH-upper_arm_ik_targetR",
    "MCH-upper_arm_ik_targetparentR",
    "upper_arm_ik_targetR",
    "MCH-foot_ikparentL",
    "foot_ikL",
    "foot_spin_ikL",
    "foot_heel_ikL",
    "MCH-heel02_rock2L",
    "MCH-heel02_rock1L",
    "MCH-heel02_roll2L",
    "MCH-heel02_roll1L",
    "MCH-foot_rollL",
    "MCH-thigh_ik_targetL",
    "MCH-thigh_ik_targetparentL",
    "thigh_ik_targetL",
    "MCH-foot_ikparentR",
    "foot_ikR",
    "foot_spin_ikR",
    "foot_heel_ikR",
    "MCH-heel02_rock2R",
    "MCH-heel02_rock1R",
    "MCH-heel02_roll2R",
    "MCH-heel02_roll1R",
    "MCH-foot_rollR",
    "MCH-thigh_ik_targetR",
    "MCH-thigh_ik_targetparentR",
    "thigh_ik_targetR",
];

const PROPERTIES = {
  rotation: { x: 0, y: 0, z: 0 },
  position: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  quaternion: { x: 0, y: 0, z: 0, w: 1 }
};

const styles = {
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    background: 'rgba(0,0,0,0.7)',
    padding: '10px',
    borderRadius: 8,
    color: 'white',
    zIndex: 1000,
    maxHeight: '90vh',
    overflowY: 'auto',
    width: '200px',
    fontSize: '12px'
  },
  select: {
    width: '100%',
    marginBottom: '10px',
    fontSize: '12px',
    padding: '4px'
  },
  propertyGroup: {
    marginBottom: '10px',
    padding: '8px',
    background: 'rgba(0,0,0,0.3)',
    borderRadius: 5
  },
  propertyTitle: {
    margin: '0 0 5px 0',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  sliderContainer: {
    marginBottom: '5px'
  },
  label: {
    display: 'block',
    marginBottom: '2px',
    fontSize: '11px'
  },
  slider: {
    width: '100%',
    margin: '0'
  }
};


export function RigControls({ modelRef }) {
    const [selectedRig, setSelectedRig] = useState('');
    const [values, setValues] = useState(PROPERTIES);
    const lastValues = useRef(PROPERTIES);
    const isDragging = useRef(false);
    const sliderRefs = useRef({});
    const labelRefs = useRef({});

    const handleRigSelect = (rigName) => {
        setSelectedRig(rigName);
        setValues(PROPERTIES);
        lastValues.current = PROPERTIES;
        
        if (modelRef.current) {
            const bone = modelRef.current.getObjectByName(rigName);
            if (bone) {
                console.log('Bone properties:', {
                    position: bone.position,
                    rotation: bone.rotation,
                    quaternion: bone.quaternion,
                    scale: bone.scale,
                    matrix: bone.matrix,
                    matrixWorld: bone.matrixWorld
                });
            }
        }
    };

    const handleValueChange = (property, axis, rawValue) => {
        const value = parseFloat(rawValue);
    
        // Update Three.js model immediately
        if (modelRef.current && selectedRig) {
            const bone = modelRef.current.getObjectByName(selectedRig);
            if (bone) {
                switch (property) {
                    case 'rotation':
                        bone.rotation[axis] = value * Math.PI / 180;
                        break;
                    case 'position':
                        bone.position[axis] = value;
                        break;
                    case 'scale':
                        bone.scale[axis] = value;
                        break;
                    case 'quaternion':
                        const q = lastValues.current.quaternion;
                        q[axis] = value;
                        bone.quaternion.set(q.x, q.y, q.z, q.w);
                        break;
                }
            }
        }
    
        // Update ref immediately
        lastValues.current = {
            ...lastValues.current,
            [property]: {
                ...lastValues.current[property],
                [axis]: value
            }
        };

        // Update label text immediately
        const labelKey = `${property}_${axis}`;
        if (labelRefs.current[labelKey]) {
            const label = labelRefs.current[labelKey];
            const unit = property === 'rotation' ? '°' : '';
            label.textContent = `${axis.toUpperCase()}: ${value.toFixed(2)}${unit}`;
        }
    
        // Only update state if not dragging
        if (!isDragging.current) {
            setValues(prev => ({
                ...prev,
                [property]: {
                    ...prev[property],
                    [axis]: value
                }
            }));
        }
    };

    const PropertyControls = ({ property, title }) => (
        <div style={styles.propertyGroup}>
            <h4 style={styles.propertyTitle}>{title}</h4>
            {['x', 'y', 'z'].map((axis) => {
                const liveValue = lastValues.current[property][axis];
                return (
                    <div key={axis} style={styles.sliderContainer}>
                        <label 
                            ref={el => {
                                if (el) {
                                    labelRefs.current[`${property}_${axis}`] = el;
                                }
                            }}
                            style={styles.label}
                        >
                            {axis.toUpperCase()}: {liveValue.toFixed(2)}
                            {property === 'rotation' ? '°' : ''}
                        </label>
                        <input
                            ref={el => {
                                if (el) {
                                    sliderRefs.current[`${property}_${axis}`] = el;
                                }
                            }}
                            type="range"
                            min={property === 'scale' ? 0 : -180}
                            max={property === 'scale' ? 2 : 180}
                            step={property === 'scale' ? 0.01 : 1}
                            defaultValue={liveValue}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                handleValueChange(property, axis, value);
                                // Update the slider's value directly
                                if (sliderRefs.current[`${property}_${axis}`]) {
                                    sliderRefs.current[`${property}_${axis}`].value = value;
                                }
                            }}
                            onMouseDown={() => isDragging.current = true}
                            onMouseUp={() => {
                                isDragging.current = false;
                                setValues(prev => ({
                                    ...prev,
                                    [property]: {
                                        ...prev[property],
                                        [axis]: lastValues.current[property][axis]
                                    }
                                }));
                            }}
                            onTouchStart={() => isDragging.current = true}
                            onTouchEnd={() => {
                                isDragging.current = false;
                                setValues(prev => ({
                                    ...prev,
                                    [property]: {
                                        ...prev[property],
                                        [axis]: lastValues.current[property][axis]
                                    }
                                }));
                            }}
                            style={styles.slider}
                        />
                    </div>
                );
            })}
            {property === 'quaternion' && (
                <div style={styles.sliderContainer}>
                    <label 
                        ref={el => {
                            if (el) {
                                labelRefs.current[`quaternion_w`] = el;
                            }
                        }}
                        style={styles.label}
                    >
                        W: {lastValues.current.quaternion.w.toFixed(2)}
                    </label>
                    <input
                        ref={el => {
                            if (el) {
                                sliderRefs.current[`quaternion_w`] = el;
                            }
                        }}
                        type="range"
                        min="-1"
                        max="1"
                        step="0.01"
                        defaultValue={lastValues.current.quaternion.w}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            handleValueChange('quaternion', 'w', value);
                            // Update the slider's value directly
                            if (sliderRefs.current[`quaternion_w`]) {
                                sliderRefs.current[`quaternion_w`].value = value;
                            }
                        }}
                        onMouseDown={() => isDragging.current = true}
                        onMouseUp={() => {
                            isDragging.current = false;
                            setValues(prev => ({
                                ...prev,
                                quaternion: {
                                    ...prev.quaternion,
                                    w: lastValues.current.quaternion.w
                                }
                            }));
                        }}
                        onTouchStart={() => isDragging.current = true}
                        onTouchEnd={() => {
                            isDragging.current = false;
                            setValues(prev => ({
                                ...prev,
                                quaternion: {
                                    ...prev.quaternion,
                                    w: lastValues.current.quaternion.w
                                }
                            }));
                        }}
                        style={styles.slider}
                    />
                </div>
            )}
        </div>
    );

    return (
        <div style={styles.container}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Rig Controls</h3>
            <select 
                value={selectedRig} 
                onChange={(e) => handleRigSelect(e.target.value)}
                style={styles.select}
            >
                <option value="">Select a rig point</option>
                {RIG_POINTS.map((rig) => (
                    <option key={rig} value={rig}>{rig}</option>
                ))}
            </select>
            
            {selectedRig && (
                <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '12px' }}>{selectedRig}</h4>
                    <PropertyControls property="rotation" title="Rotation" />
                    <PropertyControls property="position" title="Position" />
                    <PropertyControls property="scale" title="Scale" />
                    <PropertyControls property="quaternion" title="Quaternion" />
                </div>
            )}
        </div>
    );
}