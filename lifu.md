Low-Intensity Focused Ultrasound.
Precision Therapy, Reimagined for PCOD and PCOS.

Opensource • Feature Rich
LIFU
Low-Intensity Focused Ultrasound
Modular and configurable for many applications

Transmit Modules
64-Ch, synchronized, cascading tiles.
Two Center Frequencies
155 KHz & 400 KHz
Android Targeting App
Photogrammetry
Open-Source Platform
GUI, 3D Slicer or Python Control

LIFU:
(LOW-INTENSITY FOCUSED ULTRASOUND)

Low Intensity Focused Ultrasound (LIFU) platform for research.  The platform is flexible, easy-to-use, and can deliver LIFU to targets located nearly anywhere in the head or body. While LIFU 2.0 devices are ready to set up “out of the box”, their open-source design allows customization and modification to support clinical research across diverse users and applications. At the same time, LIFU 2.0’s controlled design features make it an effective solution for developing regulated medical devices that are portable and low-cost. By filling the gap between expensive research hardware available for proof-of-concept studies and commercially manufacturable hardware suitable for regulated medical devices, LIFU 2.0 greatly facilitates the translation of novel therapies from bench to bedside.

Research Spotlight
Webinar: Transcranial Focused Ultrasound Neuromodulation of the Default Mode Network in the Treatment of Depression and Promotion of Wellness
Repetitive Negative Thinking (RNT)—including rumination and worry—is a transdiagnostic cognitive process central to major depressive disorder (MDD), generalized anxiety disorder (GAD), and obsessive-compulsive disorder (OCD). Elevated RNT is linked to increased connectivity within the brain’s Default Mode Network (DMN), which supports self-referential thought and is often hyperactive in these conditions.  Emerging evidence suggests that low-intensity transcranial focused ultrasound (litFUS) may reduce Repetitive Negative Thinking (RNT) and mood-related symptoms in clinical populations, and also promote emotional wellness in nonclinical groups.


Designed for discovery and built for translation, LIFU gives researchers a configurable platform to investigate low-intensity focused ultrasound effects and therapies — then carry that work from the lab to the clinic without switching platforms.

One System. Infinite Parameters.
Configure, explore, and translate LIFU research — all on a single modular platform.

Focused ultrasound, open to everyone.

LIFU is a fully modular, open-source low-intensity focused ultrasound platform — designed for researchers, clinicians, and developers who demand precision, reproducibility, and the freedom to build without limi


Low-Intensity Focused ultrasound 
Open to Everyone
 

Open-LIFU is a fully modular, open-source low-intensity focused ultrasound platform — designed for researchers, clinicians, and developers who demand precision, reproducibility, and the freedom to build without limits.
Three components. Infinite configurations.
The Open-LIFU hardware platform is built around a clean separation of concerns — a powerful console, a wearable transducer, and the supporting software stack that ties it all together. Each element is documented, serviceable, and open for extension.

Console. The control brain. Generates high-voltage drive signals (up to ±65 V), coordinates timing, and communicates with your PC over USB-C. Compact at 3 lb — fits any lab bench.

Transducer. A wearable headset housing one or two 64-element 2D matrix transmit modules. Ships with a disposable hydrogel coupling pad and spatial-localization markings built in.

Software stack. A five-layer open-source stack — from 3D Slicer treatment planning to a low-level transmit-module SDK. Runs on Windows 11 with NVIDIA CUDA for real-time processing.

Precision you can measure.
Every parameter in a sonication sequence is fully programmable — pulse frequency, focal pressure, duration, repetition interval, and train count — giving researchers exact reproducibility across sessions and sites.

64 Elements per transmit module (2D matrix array)

1× or 2× Transmit module configurations for shallow or deep targets

2.16 MPa Peak negative pressure — dual 400 kHz config, derated

3–11 cm Axial steering range (2× configuration)

0–1200 kPa Programmable focal pressure range

10 MHz Beamformer clock for fine-grained phase control

Available at 155 kHz or 400 kHz, each in 1× or 2× configuration.

Built for subjects, not just benches.
The transducer ships as a soft-strap headset with foam padding for a comfortable, non-slip fit. A water-based polymer hydrogel coupling pad conforms to curved surfaces like the forehead, eliminating air gaps and maximizing acoustic transmission — no messy gel bath required.

An embossed faceplate pattern enables photogrammetric 3D localization via a standard Android phone — spatial tracking without the overhead of external navigation hardware.

Know exactly where you're sonicating.
Open-LIFU uses your Android phone's dual camera to reconstruct a 3D mesh of the transducer's position relative to the subject. That mesh feeds directly into the treatment-planning software, letting you target with anatomical precision before the first pulse is fired.

No external tracker needed. Localization runs on your existing phone hardware.
DICOM-compatible. Import MRI or CT scans for target registration.
3D Slicer integration. Familiar environment for neuronavigation and planning.
Open. Always.
Open-LIFU isn't a black box. Every hardware schematic, firmware file, and software layer is published and community-licensed — so you can validate, extend, and build on a foundation you actually understand.

Hardware under CC BY-SA 4.0 · Documentation under CC BY 4.0

Fork the repo, file an issue, or contribute a pull request. The community lives on GitHub and Discord — from independent researchers running single-site studies to teams building novel neuromodulation protocols.

Precision Without Movement:
How Open-LIFU Steers Focused Ultrasound to a Point

By precisely timing when each element fires, Open-LIFU's 2D matrix array concentrates acoustic energy anywhere in a three-dimensional volume — no mechanical repositioning required.
 

Steering sound with math: how Open-LIFU's 2D array focuses ultrasound
A single ultrasound transducer emits a cone of sound that spreads in every direction. Useful for imaging, but too diffuse for neuromodulation — if you want to stimulate a precise structure deep in the brain, you need energy concentrated at an exact point in three-dimensional space. That's the core problem Open-LIFU is built to solve.

At the heart of the Open-LIFU platform sits a wearable headset housing one or two 64-element 2D matrix transmit modules. Each of those 64 elements is independently addressable. Each fires at a calculated delay. Together, they do something no single transducer can: bend sound to a point. 

The physics of constructive interference
When two wavefronts arrive at the same point at the same time, they add together. When they arrive half a wavelength out of phase, they cancel. Open-LIFU exploits this: by firing all 64 elements with individually tuned delays, every wavefront is arranged to arrive at the target simultaneously. Amplitudes stack — constructive interference — producing a hot spot of acoustic pressure far more intense than any individual element could generate alone. Everywhere else, the waves cancel or disperse harmlessly through tissue.

From a line to a grid
A 1D array can steer and focus a beam, but only within a single plane — you get control in two dimensions, not three. Open-LIFU's 2D matrix layout changes that entirely. With elements arranged in a full grid, the focal point can be positioned anywhere in the volume in front of the transducer — left, right, up, down, near, far — without moving the headset at all.

Steering by delay
The key variable is when each element fires. To focus at a target, the beamformer calculates the distance from that target to every element in the 8×8 grid. Elements that are farther away fire first; elements that are closer fire later. The delays are chosen so that every wavefront arrives at the target simultaneously. Open-LIFU's beamformer runs on a 10 MHz clock for fine-grained phase control, giving sub-microsecond timing precision across all 64 channels.2d_array_beamsteering_8x8 (1)

Want to move the focus deeper? Increase delays uniformly around the perimeter and decrease them toward the center — the classic converging lens pattern. Want to steer laterally? Shift the delay map in that direction. These profiles are computed and updated in software, meaning the focal point can be repositioned electronically between pulses without touching the hardware.

Every parameter, fully programmable
Every parameter in a sonication sequence is fully programmable — pulse frequency, focal pressure, duration, repetition interval, and train count — giving researchers exact reproducibility across sessions and sites. The system supports a programmable focal pressure range of 0–1200 kPa, and in dual-module configuration achieves a peak negative pressure of 2.16 MPa with an axial steering range of 3–11 cm.

 
Why 2D matters clinically
With a 1D array, a researcher must physically reposition the transducer to reach targets outside its focal plane. Open-LIFU's 2D matrix eliminates that constraint. The focal point can be steered across a volume electronically — useful for targeting irregular anatomical structures or adapting to subject-to-subject variation without re-seating the headset.

This capability pairs directly with Open-LIFU's spatial localization system. An embossed faceplate pattern enables photogrammetric 3D localization via a standard Android phone, and that mesh feeds directly into the treatment-planning software, letting you target with anatomical precision before the first pulse is fired. The result is a closed loop: anatomy in, delay profile out, focused energy on target.

Open, documented, and ready to extend
Every hardware schematic, firmware file, and software layer is published and community-licensed — so the beamforming logic itself is transparent and auditable, not a black box. Whether you're validating a protocol, building a novel neuromodulation study, or extending the platform for a new application, the 2D array's delay architecture is yours to understand and modify.

The result is a tool that behaves less like a blunt instrument and more like a scalpel made of sound: precise, steerable, reproducible, and entirely non-invasive.